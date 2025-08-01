# Azure Deployment Guide for Sri Laxmi Alankar

## Prerequisites
1. Azure account with active subscription
2. Azure CLI installed locally
3. Node.js and npm installed
4. Git installed

## Deployment Options

### Option 1: Azure Static Web Apps (Recommended)
1. **Prepare your code**
   - Make sure all changes are committed to your Git repository
   - The repository should be on GitHub, Azure Repos, or Bitbucket

2. **Create a Static Web App in Azure**
   - Go to Azure Portal (https://portal.azure.com)
   - Click "Create a resource"
   - Search for "Static Web App" and create a new one
   - Select your subscription and resource group (or create new ones)
   - Enter a unique name for your app
   - Select your region
   - For "Deployment details", select your source control provider
   - Select your organization, repository, and branch
   - For "Build Presets", choose "React"
   - Set the app location to "/"
   - Set the app artifact location to "build"
   - Click "Review + create" and then "Create"

3. **Configure Environment Variables**
   - After deployment, go to your Static Web App in Azure Portal
   - Go to "Configuration" under "Settings"
   - Add the following application settings:
     - `REACT_APP_API_URL`: `https://backend.srilaxmialankar.com`
     - `REACT_APP_ENV`: `production`

### Option 2: Azure App Service

1. **Build the application**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy using Azure CLI**
   ```bash
   # Login to Azure
   az login
   
   # Create a resource group (if needed)
   az group create --name sri-laxmi-rg --location eastus
   
   # Create an App Service plan
   az appservice plan create --name srilaxmi-plan --resource-group sri-laxmi-rg --sku B1 --is-linux
   
   # Create a web app
   az webapp create --resource-group sri-laxmi-rg --plan srilaxmi-plan --name sri-laxmi-alankar --runtime "NODE|18-lts"
   
   # Configure the app
   az webapp config appsettings set --resource-group sri-laxmi-rg --name sri-laxmi-alankar --settings \
     REACT_APP_API_URL=https://backend.srilaxmialankar.com \
     REACT_APP_ENV=production
   
   # Deploy the built files
   cd build
   zip -r ../build.zip .
   az webapp deployment source config-zip --resource-group sri-laxmi-rg --name sri-laxmi-alankar --src ../build.zip
   ```

## Post-Deployment
1. **Verify the deployment**
   - Open your browser and navigate to your app's URL
   - Check the browser's developer console for any errors
   - Test all major functionality including API calls

2. **Set up custom domain (Optional)**
   - Go to your Static Web App/App Service in Azure Portal
   - Navigate to "Custom domains"
   - Follow the instructions to add your custom domain
   - Update your DNS settings as instructed

## Troubleshooting
- If you see CORS errors, verify the backend CORS settings include your frontend URL
- Check Azure Portal's "Log stream" for real-time logs
- For Static Web Apps, check the "Workflow" tab in GitHub Actions for build logs
