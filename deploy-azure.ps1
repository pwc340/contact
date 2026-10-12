# Azure Static Web Apps Deployment Script for PwC Contact Page
# Run this script to deploy to Azure

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "pwc-contact-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$AppName = "pwc-contact-page",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "eastasia"
)

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  PwC Contact Page - Azure Deployment" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Azure CLI is installed
Write-Host "Checking Azure CLI installation..." -ForegroundColor Yellow
$azCliInstalled = Get-Command az -ErrorAction SilentlyContinue

if (-not $azCliInstalled) {
    Write-Host "❌ Azure CLI is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Azure CLI:" -ForegroundColor Yellow
    Write-Host "1. Visit: https://aka.ms/installazurecliwindows" -ForegroundColor White
    Write-Host "2. Or run: winget install -e --id Microsoft.AzureCLI" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "✅ Azure CLI found" -ForegroundColor Green
Write-Host ""

# Build the project
Write-Host "Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully" -ForegroundColor Green
Write-Host ""

# Login to Azure
Write-Host "Checking Azure login status..." -ForegroundColor Yellow
$accountInfo = az account show 2>$null

if (-not $accountInfo) {
    Write-Host "Please login to Azure..." -ForegroundColor Yellow
    az login
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Azure login failed!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Logged in to Azure" -ForegroundColor Green
Write-Host ""

# List subscriptions
Write-Host "Available subscriptions:" -ForegroundColor Yellow
az account list --output table
Write-Host ""

# Create or check resource group
Write-Host "Checking resource group: $ResourceGroup..." -ForegroundColor Yellow
$rgExists = az group exists --name $ResourceGroup

if ($rgExists -eq "false") {
    Write-Host "Creating resource group..." -ForegroundColor Yellow
    az group create --name $ResourceGroup --location $Location
    Write-Host "✅ Resource group created" -ForegroundColor Green
} else {
    Write-Host "✅ Resource group already exists" -ForegroundColor Green
}
Write-Host ""

# Check if Static Web App exists
Write-Host "Checking if Static Web App exists..." -ForegroundColor Yellow
$appExists = az staticwebapp show --name $AppName --resource-group $ResourceGroup 2>$null

if (-not $appExists) {
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "  Manual Setup Required" -ForegroundColor Cyan
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To deploy via GitHub Actions (Recommended):" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Push this project to GitHub:" -ForegroundColor White
    Write-Host "   git init" -ForegroundColor Gray
    Write-Host "   git add ." -ForegroundColor Gray
    Write-Host "   git commit -m 'Initial commit'" -ForegroundColor Gray
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/pwc-contact-page.git" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Go to Azure Portal: https://portal.azure.com" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Create Static Web App:" -ForegroundColor White
    Write-Host "   - Click 'Create a resource'" -ForegroundColor Gray
    Write-Host "   - Search 'Static Web App'" -ForegroundColor Gray
    Write-Host "   - Fill in:" -ForegroundColor Gray
    Write-Host "     * Name: $AppName" -ForegroundColor Gray
    Write-Host "     * Region: $Location" -ForegroundColor Gray
    Write-Host "     * Source: GitHub" -ForegroundColor Gray
    Write-Host "     * Repository: YOUR_REPO" -ForegroundColor Gray
    Write-Host "     * Branch: main" -ForegroundColor Gray
    Write-Host "     * Build Preset: Custom" -ForegroundColor Gray
    Write-Host "     * App location: /" -ForegroundColor Gray
    Write-Host "     * Output location: dist" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. Azure will auto-deploy on every push!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Alternative: Manual Upload via Portal" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Go to Azure Portal" -ForegroundColor White
    Write-Host "2. Create Static Web App (Source: Other)" -ForegroundColor White
    Write-Host "3. Get deployment token from portal" -ForegroundColor White
    Write-Host "4. Run: " -ForegroundColor White
    Write-Host "   npm install -g @azure/static-web-apps-cli" -ForegroundColor Gray
    Write-Host "   swa deploy ./dist --deployment-token YOUR_TOKEN" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "✅ Static Web App exists" -ForegroundColor Green
    
    # Get app URL
    $appUrl = az staticwebapp show --name $AppName --resource-group $ResourceGroup --query "defaultHostname" -o tsv
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "  Deployment Information" -ForegroundColor Cyan
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "App Name: $AppName" -ForegroundColor White
    Write-Host "Resource Group: $ResourceGroup" -ForegroundColor White
    Write-Host "URL: https://$appUrl" -ForegroundColor Green
    Write-Host ""
    Write-Host "To redeploy, push changes to your GitHub repository" -ForegroundColor Yellow
    Write-Host "GitHub Actions will automatically build and deploy" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Visit your app URL" -ForegroundColor White
Write-Host "2. Configure custom domain (optional):" -ForegroundColor White
Write-Host "   - In Azure Portal → Static Web App → Custom domains" -ForegroundColor Gray
Write-Host "3. View deployment logs:" -ForegroundColor White
Write-Host "   - GitHub → Actions tab" -ForegroundColor Gray
Write-Host "4. Monitor with Application Insights:" -ForegroundColor White
Write-Host "   - In Azure Portal → Static Web App → Application Insights" -ForegroundColor Gray
Write-Host ""
Write-Host "For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Yellow
Write-Host ""
