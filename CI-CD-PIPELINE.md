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

      # 6. Copy build archive to server
      - name: Copy package to server
        uses: appleboy/scp-action@v0.1.4
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: "dist.zip"
          target: "/tmp" # Copy to a temporary directory

      # 7. Deploy on server
      - name: Deploy on Server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            # Ensure the target directory exists, creating it if necessary
            mkdir -p ${{ secrets.SSH_TARGET_PATH }}
            
            # Navigate to the target path and safely clear old content
            cd ${{ secrets.SSH_TARGET_PATH }} && rm -rf ./*
            
            # Unzip the new build from the temporary location
            unzip /tmp/dist.zip
            
            # Clean up the temporary archive
            rm /tmp/dist.zip
```

---

## 🛡️ Deployment Strategy and Best Practices

To ensure deployments are safe and reliable, this pipeline uses a **"clean deploy"** strategy. This addresses two common issues: deploying to a new server and cleaning up old build files.

### Why not just delete and replace the folder?

While deleting the entire deployment folder (e.g., `rm -rf /var/www/problembuddy`) and replacing it seems simple, it is not a standard practice for a few important reasons:

1.  **Application Downtime**: There is a brief but critical window of time between deleting the old folder and the new one being fully copied. Any user trying to access the site during this window will receive a "404 Not Found" error.
2.  **Risk of Failed Deployment**: If the copy process fails midway, the application is left in a broken, non-existent state, requiring manual intervention to fix.
3.  **Permission Issues**: The parent directory (`/var/www/`) may have specific ownership or permissions. Deleting and re-creating the `problembuddy` folder could reset its permissions, potentially preventing the web server (like Nginx) from being able to read the files.

### The "Clean Deploy" Approach

Our pipeline avoids these risks with a safer, more robust process:

1.  **Ensure Directory Exists**: The `mkdir -p ${{ secrets.SSH_TARGET_PATH }}` command will create the full directory path if it doesn't already exist. If it does exist, the command does nothing. This makes the first-time deployment seamless.
2.  **Clear Contents, Not the Folder**: Instead of deleting the folder itself, we navigate into it (`cd`) and then run `rm -rf ./*`. This command deletes all files and subdirectories *inside* the target path but leaves the main directory and its permissions intact. This is much safer and avoids any downtime.
3.  **Atomic Operation**: The new build is unzipped into the now-empty directory. This operation is very fast, minimizing the transition time between the old and new versions.

This method guarantees that your application directory is always in a valid state and that each new deployment starts with a clean slate, free of any old, unused asset files.

##  workflow-summary Flow Summary

Here’s a step-by-step breakdown of what the updated `deploy.yml` workflow does:

1.  **Trigger**: The workflow automatically starts when you `git push` a commit to the `main` branch.
2.  **Checkout & Build**: It checks out the code, installs Node.js, installs dependencies, and runs the `npm run build` command to generate the `dist` directory.
3.  **Package**: It creates a `dist.zip` archive from the `dist` directory to make the transfer to the server a single, efficient operation.
4.  **Secure Copy (SCP)**: It uses `appleboy/scp-action` to securely copy the `dist.zip` file to a temporary location (`/tmp`) on the remote server.
5.  **Deploy on Server**: It then uses `appleboy/ssh-action` to securely connect to the server and execute a deployment script:
    -   `mkdir -p`: Creates the target directory if it doesn't exist.
    -   `cd ... && rm -rf ./*`: Navigates to the directory and safely clears all its existing contents.
    -   `unzip`: Extracts the new build from `/tmp/dist.zip` into the clean directory.
    -   `rm`: Deletes the temporary zip archive to clean up.

Once the workflow completes successfully, your latest changes will be live on your server.
