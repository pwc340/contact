# Azure Deployment Guide for PwC Contact Page

## Prerequisites
- Azure account ([Create free account](https://azure.microsoft.com/free/))
- GitHub account
- Git installed locally

## Option 1: Deploy via Azure Portal (Easiest)

### Step 1: Build the Project
```powershell
npm run build
```
This creates a `dist/` folder with production files.

### Step 2: Create Azure Static Web App

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search for **"Static Web App"**
4. Click **"Create"**
5. Fill in the details:
   - **Subscription**: Select your subscription
   - **Resource Group**: Create new or use existing
   - **Name**: `pwc-contact-page` (or your preferred name)
   - **Plan type**: Free
   - **Region**: Choose closest to your users (e.g., East Asia, Southeast Asia)
   - **Source**: Select **"Other"** (for manual upload)
6. Click **"Review + Create"** then **"Create"**

### Step 3: Deploy Files

After the resource is created:

1. Go to your Static Web App resource
2. Click **"Browse"** to see the default page
3. Get the deployment token:
   - In the left menu, click **"Deployment tokens"**
   - Copy the deployment token
4. Deploy using Azure CLI or VS Code extension (see below)

## Option 2: Deploy via GitHub Actions (Recommended)

### Step 1: Push to GitHub

```powershell
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - PwC contact page"

# Create GitHub repository and push
# (Create repo at https://github.com/new first)
git remote add origin https://github.com/YOUR_USERNAME/pwc-contact-page.git
git branch -M main
git push -u origin main
```

### Step 2: Create Azure Static Web App with GitHub Integration

1. Go to [Azure Portal](https://portal.azure.com)
2. Create Static Web App as in Option 1, but:
   - **Source**: Select **"GitHub"**
   - **Sign in with GitHub**
   - Select your **Organization**, **Repository**, and **Branch**
   - **Build Presets**: Select **"Custom"**
   - **App location**: `/`
   - **Output location**: `dist`
3. Click **"Review + Create"**

Azure will automatically:
- Create a GitHub Actions workflow
- Deploy your app
- Set up automatic deployments on every push to main

### Step 3: Verify Deployment

1. Wait 2-3 minutes for initial deployment
2. Check Actions tab in your GitHub repo for build status
3. Visit the Azure-provided URL (shown in portal)

## Option 3: Deploy via Azure CLI

### Install Azure CLI
```powershell
# Download from: https://aka.ms/installazurecliwindows
# Or use winget:
winget install -e --id Microsoft.AzureCLI
```

### Deploy
```powershell
# Login to Azure
az login

# Create resource group
az group create --name pwc-contact-rg --location eastasia

# Create static web app
az staticwebapp create \
  --name pwc-contact-page \
  --resource-group pwc-contact-rg \
  --source https://github.com/YOUR_USERNAME/pwc-contact-page \
  --location eastasia \
  --branch main \
  --app-location "/" \
  --output-location "dist" \
  --token YOUR_GITHUB_TOKEN
```

## Option 4: Deploy via VS Code Extension

### Step 1: Install Extension
1. Open VS Code
2. Install **"Azure Static Web Apps"** extension
3. Sign in to Azure

### Step 2: Deploy
1. Click Azure icon in sidebar
2. Click **"+"** to create new Static Web App
3. Follow the prompts:
   - Select subscription
   - Enter app name
   - Select region
   - Build preset: Custom
   - App location: `/`
   - Output location: `dist`
4. Wait for deployment to complete

## Configure Custom Domain

### Step 1: Add Custom Domain in Azure

1. In Azure Portal, go to your Static Web App
2. Click **"Custom domains"** in the left menu
3. Click **"+ Add"**
4. Choose domain type:
   - **Custom domain on other DNS**: For external domains
   - **Custom domain on Azure DNS**: For Azure-managed domains

### Step 2: Configure DNS

Add these DNS records at your domain registrar:

**For apex domain (example.com):**
```
Type: CNAME or ALIAS
Name: @
Value: YOUR-APP-NAME.azurestaticapps.net
```

**For subdomain (www.example.com or contact.pwc.in):**
```
Type: CNAME
Name: contact (or www)
Value: YOUR-APP-NAME.azurestaticapps.net
```

### Step 3: Validate Domain

1. Wait for DNS propagation (5-60 minutes)
2. In Azure Portal, click **"Validate"** next to your domain
3. Azure will automatically provision SSL certificate

## Environment Variables (Optional)

If you need backend API integration:

1. In Azure Portal, go to your Static Web App
2. Click **"Configuration"** in left menu
3. Add environment variables:
   - `API_ENDPOINT`
   - `FORM_SUBMISSION_URL`
   - etc.

## Monitoring & Analytics

### Enable Application Insights

1. In Azure Portal, go to your Static Web App
2. Click **"Application Insights"** in left menu
3. Click **"Enable"**
4. Create or select Application Insights resource

### View Analytics

- **Traffic**: Monitor visitors, page views
- **Performance**: Track load times
- **Errors**: See any client-side errors

## Costs

- **Free Tier**: 100 GB bandwidth/month, unlimited custom domains
- **Standard Tier**: $9/month + $0.20/GB bandwidth

For PwC contact page, Free tier is sufficient.

## Custom Domain Examples

Your app will be accessible at:
- Default: `https://pwc-contact-page.azurestaticapps.net`
- Custom: `https://contact.pwc.in` (after DNS setup)
- Custom: `https://www.yourcompany.com`

## Troubleshooting

### Build fails on Azure
- Check GitHub Actions logs
- Verify `package.json` scripts are correct
- Ensure `dist/` folder is in `.gitignore`

### 404 errors on routes
- Check `staticwebapp.config.json` is in root
- Verify `navigationFallback` is configured

### Custom domain not working
- Wait for DNS propagation (up to 48 hours)
- Verify DNS records with: `nslookup YOUR-DOMAIN`
- Check domain validation in Azure Portal

## Next Steps

1. ✅ Build: `npm run build`
2. ✅ Choose deployment method (Portal/GitHub/CLI/VS Code)
3. ✅ Deploy to Azure
4. ✅ Configure custom domain (optional)
5. ✅ Enable HTTPS (automatic with Azure)
6. ✅ Monitor with Application Insights

## Support

- [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [Pricing Details](https://azure.microsoft.com/pricing/details/app-service/static/)
- [Custom Domains Guide](https://docs.microsoft.com/azure/static-web-apps/custom-domain)
