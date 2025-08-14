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

      # 5. Verify the build output to prevent deploying an empty folder
      - name: Verify Build Output
        run: |
          if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
            echo "Build verification failed: 'dist' directory is empty or does not exist."
            exit 1
          fi
          echo "Build output verified."

      # 6. Package the build output into a zip file
      - name: Package Build Artifacts
        run: zip -r dist.zip dist

      # 7. Copy build archive to server
      - name: Copy package to server
        uses: appleboy/scp-action@v0.1.4
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: "dist.zip"
          target: "/tmp" # Copy to a temporary directory

      # 8. Deploy on server with verification
      - name: Deploy and Verify on Server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            set -e # Exit immediately if a command fails
            
            # Ensure the target directory exists, creating it if necessary
            echo "Ensuring target directory exists..."
            mkdir -p ${{ secrets.SSH_TARGET_PATH }}
            
            # Navigate to the target path and safely clear old content.
            # You are correct that asset names (e.g., assets/*.js) change with each build.
            # To prevent old, unused files from accumulating, we must clear the directory before deploying.
            # `find . -mindepth 1 -delete` is a safe and robust way to delete all contents (including hidden files)
            # without deleting the parent directory itself, which preserves its permissions.
            # It is safer and more thorough than `rm -rf *`, which might not delete hidden dotfiles.
            echo "Clearing old application files..."
            cd ${{ secrets.SSH_TARGET_PATH }}
            find . -mindepth 1 -delete
            
            # Unzip the new build from the temporary location
            echo "Unzipping new build..."
            unzip -o /tmp/dist.zip -d .
            
            # Clean up the temporary archive
            echo "Cleaning up temporary archive..."
            rm /tmp/dist.zip

            # Final verification check
            if [ ! -f "index.html" ]; then
                echo "Deployment verification failed: index.html not found!"
                exit 1
            fi

            echo "🚀 Deployment successful!"
```

---

## 🛡️ Enhanced Error Handling and Verification

Yes, the CI/CD pipeline is designed to **stop execution immediately upon any error**. This is a core feature of GitHub Actions and is enhanced in our script with additional safety checks to ensure a robust and reliable deployment process.

### Key Safety Features:

1.  **Fail-Fast Execution**: By default, if any command in a workflow step (like `npm run build`) fails (returns a non-zero exit code), the entire job stops. This prevents a failed build from being deployed.
2.  **Build Output Verification**: Before packaging and deploying, a new step explicitly checks that the `dist` directory was created and is not empty. This prevents the pipeline from deploying nothing if the build process silently fails.
3.  **Safe Remote Scripting (`set -e`)**: The deployment script executed on the server begins with `set -e`. This command ensures that the script will exit immediately if any command within it fails. For example, if the `unzip` command were to fail, the script would not proceed to the cleanup or verification steps, and the workflow would be marked as failed.
4.  **Final Deployment Check**: After unzipping the files, the script verifies that the main `index.html` file exists in the target directory. This is a final sanity check to confirm that the deployment was successful and the site's entry point is present. If it's missing, the workflow will fail, immediately alerting you to a problem.

### The "Clean Deploy" Approach & Why We Use `find`

You are absolutely correct: a tool like Vite generates files with unique hashes in their names for caching purposes (e.g., `assets/index-a1b2c3d4.js`). If we simply copied new files over the old ones, the directory would quickly fill up with unused, old assets.

To solve this, our pipeline uses a **"clean deploy"** strategy. Before deploying the new code, it completely wipes the contents of the target directory.

#### Why `find . -mindepth 1 -delete` is the Right Tool

While a command like `rm -rf *` seems simpler and is very common, `find . -mindepth 1 -delete` is used because it is more robust and safer for this specific task:

1.  **It Deletes Everything:** The `*` in `rm -rf *` does not match hidden files (or "dotfiles") by default. This means if your build ever produced a file like `.htaccess` or a directory like `.well-known`, `rm` would leave it behind. `find` deletes *all* contents, including hidden ones, ensuring a truly clean slate.
2.  **It Protects the Parent Directory:** The command deletes the *contents* of the directory without touching the directory itself. This is critical because deleting and recreating the main directory (`/var/www/problembuddy`) could reset its ownership and permissions, which might cause the web server (like Nginx) to lose access and result in a "403 Forbidden" error for your users.

By using `find`, we get the clean slate we need while preserving the integrity of the folder structure, making the deployment process more reliable.

## 📝 Workflow Summary

Here’s a step-by-step breakdown of what the enhanced `deploy.yml` workflow does:

1.  **Trigger**: Automatically starts on `git push` to the `main` branch.
2.  **Checkout & Build**: Checks out code, sets up Node.js, installs dependencies, and runs `npm run build`.
3.  **Verify Build**: Checks that the `dist` directory exists and is not empty. **If not, the workflow fails.**
4.  **Package**: Creates a `dist.zip` archive.
5.  **Secure Copy (SCP)**: Securely copies `dist.zip` to `/tmp` on the remote server.
6.  **Deploy & Verify on Server**: Securely connects to the server and runs a script that:
    -   Immediately exits on any error (`set -e`).
    -   Creates the target directory if needed (`mkdir -p`).
    -   Safely clears all existing content, including hidden files (`find . -delete`).
    -   Extracts the new build (`unzip`).
    -   Deletes the temporary zip archive (`rm`).
    -   Checks for `index.html`. **If missing, the workflow fails.**
    -   Reports success.

If the workflow completes successfully, your latest changes are live and verified on your server.
