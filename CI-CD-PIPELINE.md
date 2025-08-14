# 🚀 CI/CD Build & Deployment Pipeline

This document outlines the continuous integration and continuous deployment (CI/CD) pipeline for the Problembuddy application. The pipeline automates the process of building the application from source, packaging it, and deploying it to a remote server whenever changes are pushed to the main branch of the Git repository.

We will use **GitHub Actions** as the CI/CD platform for this guide.

---

## 📋 Prerequisites

Before setting up the pipeline, ensure you have the following:

1.  **GitHub Repository**: Your application code hosted on GitHub.
2.  **Remote Server**: A server (e.g., a VPS) with SSH access where the application will be hosted.
3.  **SSH Key Pair**: An SSH key pair for authenticating with your server. The private key will be stored in GitHub Secrets, and the public key will be added to the server's `~/.ssh/authorized_keys` file.
4.  **Build Tool**: The project is configured to use a build tool like **Vite**. A `package.json` with a `build` script (`"build": "vite build"`) is required.
5.  **Web Server**: A web server like Nginx or Apache configured on the remote server to serve the contents of the `dist` directory.

> **Note on Project Structure:** This guide assumes the project uses a standard build tool like Vite. The current project structure uses direct ESM imports and will need to be adapted to a Vite-based setup for this pipeline to function as described.

---

## ⚙️ Pipeline Configuration

The entire workflow is defined in a YAML file located at `.github/workflows/deploy.yml`.

### 1. Setting Up GitHub Secrets

Never hardcode sensitive information like SSH keys or server details in your workflow file. Use GitHub's encrypted secrets.

Navigate to your repository on GitHub and go to `Settings` > `Secrets and variables` > `Actions`. Create the following repository secrets:

-   `SSH_PRIVATE_KEY`: The **private** key of your SSH key pair. It should start with `-----BEGIN OPENSSH PRIVATE KEY-----`.
-   `SSH_HOST`: The IP address or domain name of your remote server (e.g., `192.168.1.100`).
-   `SSH_USERNAME`: The username for logging into your server via SSH (e.g., `ubuntu`).
-   `SSH_TARGET_PATH`: The absolute path on the server where the application will be deployed (e.g., `/var/www/problembuddy`).

### 2. The GitHub Actions Workflow File

Create a file at `.github/workflows/deploy.yml` and add the following content:

```yaml
name: Build and Deploy to Server

# Trigger the workflow on pushes to the main branch
on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    name: Build and Deploy
    # Use the latest Ubuntu runner
    runs-on: ubuntu-latest

    steps:
      # 1. Checkout the repository code
      - name: Checkout Code
        uses: actions/checkout@v4

      # 2. Set up Node.js environment
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20' # Specify your Node.js version
          cache: 'npm'       # Enable caching for npm dependencies

      # 3. Install project dependencies
      - name: Install Dependencies
        run: npm install

      # 4. Build the application
      - name: Build Project
        run: npm run build # This executes "vite build"

      # 5. Package the build output into a zip file
      - name: Package Build Artifacts
        run: zip -r dist.zip dist

      # 6. Deploy to server via SSH
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            # Copy the zip file to the target path on the server
            scp -o StrictHostKeyChecking=no dist.zip ${{ secrets.SSH_USERNAME }}@${{ secrets.SSH_HOST }}:${{ secrets.SSH_TARGET_PATH }}
            
            # Connect to the server and run deployment commands
            ssh -o StrictHostKeyChecking=no ${{ secrets.SSH_USERNAME }}@${{ secrets.SSH_HOST }} << 'EOF'
              cd ${{ secrets.SSH_TARGET_PATH }}
              # Unzip the file, overwriting existing files without prompting
              unzip -o dist.zip
              # Remove the zip file after extraction
              rm dist.zip
            EOF
```

---

##  workflow-summary Flow Summary

Here’s a step-by-step breakdown of what the `deploy.yml` workflow does:

1.  **Trigger**: The workflow automatically starts when you `git push` a commit to the `main` branch.

2.  **Checkout Code**: The first step checks out your repository's code into the GitHub Actions runner environment.

3.  **Set up Node.js**: It installs the specified version of Node.js and sets up caching for `node_modules` to speed up future builds.

4.  **Install Dependencies**: It runs `npm install` to download all the project dependencies defined in `package.json` and `package-lock.json`.

5.  **Build Project**: It executes the `npm run build` command. For a Vite project, this compiles the React/TypeScript code, bundles assets, and places the production-ready static files into a `dist` directory.

6.  **Package Artifacts**: It creates a `dist.zip` file containing the contents of the `dist` directory. This makes transferring the files to the server faster and more efficient.

7.  **Deploy to Server**:
    - This step uses the `appleboy/ssh-action` community action, which simplifies SSH operations.
    - It authenticates with the server using the secrets you configured.
    - It uses `scp` (Secure Copy Protocol) to transfer the `dist.zip` file from the runner to the `SSH_TARGET_PATH` on your server.
    - It then establishes an SSH connection to the server and executes a series of shell commands:
        - `cd ${{ secrets.SSH_TARGET_PATH }}`: Navigates to the deployment directory.
        - `unzip -o dist.zip`: Extracts the contents of the zip file. The `-o` flag ensures that existing files are overwritten without any user prompt.
        - `rm dist.zip`: Deletes the zip archive to clean up the server.

Once the workflow completes successfully, your latest changes will be live on your server.
