# SplitSetGO Environment Setup Script (PowerShell)
# This script helps you set up environment files for different deployment stages

param(
    [switch]$Force
)

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "🚀 SplitSetGO Environment Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ $Message" -ForegroundColor Blue
}

# Check if we're in the right directory
if (-not (Test-Path "package.json") -or -not (Test-Path "env")) {
    Write-Error "Please run this script from the root of your SplitSetGO project"
    exit 1
}

# Create .env.local if it doesn't exist
if (-not (Test-Path ".env.local") -or $Force) {
    Write-Info "Creating .env.local from template..."
    if (Test-Path "env/env.local.example") {
        Copy-Item "env/env.local.example" ".env.local"
        Write-Status "Created .env.local"
    } else {
        Write-Error "Template env/env.local.example not found"
        exit 1
    }
} else {
    Write-Warning ".env.local already exists, skipping..."
}

# Function to setup environment file
function Setup-Env {
    param([string]$EnvName)
    
    $templateFile = "env/env.$EnvName"
    $targetFile = ".env.$EnvName"
    
    if (Test-Path $targetFile -and -not $Force) {
        Write-Warning ".env.$EnvName already exists, skipping..."
        return
    }
    
    if (Test-Path $templateFile) {
        Copy-Item $templateFile $targetFile
        Write-Status "Created .env.$EnvName"
    } else {
        Write-Error "Template $templateFile not found"
    }
}

# Setup different environment files
Write-Info "Setting up environment files..."
Setup-Env "development"
Setup-Env "staging"
Setup-Env "production"
Setup-Env "test"

# Create .env.example if it doesn't exist
if (-not (Test-Path ".env.example") -or $Force) {
    Write-Info "Creating .env.example..."
    if (Test-Path "env/env.example") {
        Copy-Item "env/env.example" ".env.example"
        Write-Status "Created .env.example"
    } else {
        Write-Error "Template env/env.example not found"
        exit 1
    }
}

# Check for required tools
Write-Info "Checking for required tools..."

# Check if git is available
try {
    $gitVersion = git --version 2>$null
    if ($gitVersion) {
        Write-Status "Git is available"
        
        # Add .env files to .gitignore if not already there
        if (Test-Path ".gitignore") {
            $gitignoreContent = Get-Content ".gitignore" -Raw
            if ($gitignoreContent -notmatch "\.env\.local") {
                Add-Content ".gitignore" ""
                Add-Content ".gitignore" "# Environment files"
                Add-Content ".gitignore" ".env.local"
                Add-Content ".gitignore" ".env.production"
                Add-Content ".gitignore" ".env.staging"
                Add-Content ".gitignore" ".env.development"
                Add-Content ".gitignore" ".env.test"
                Write-Status "Added environment files to .gitignore"
            }
        }
    }
} catch {
    Write-Warning "Git not found, skipping .gitignore update"
}

# Check if node is available
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Status "Node.js is available (version: $nodeVersion)"
    } else {
        Write-Error "Node.js not found. Please install Node.js to continue."
        exit 1
    }
} catch {
    Write-Error "Node.js not found. Please install Node.js to continue."
    exit 1
}

# Check if npm is available
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Status "npm is available (version: $npmVersion)"
    } else {
        Write-Error "npm not found. Please install npm to continue."
        exit 1
    }
} catch {
    Write-Error "npm not found. Please install npm to continue."
    exit 1
}

Write-Host ""
Write-Host "🎉 Environment setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Edit .env.local with your actual API keys" -ForegroundColor White
Write-Host "2. Run 'npm install' to install dependencies" -ForegroundColor White
Write-Host "3. Run 'npm run dev' to start development server" -ForegroundColor White
Write-Host ""
Write-Host "📚 For more information, see env/README.md" -ForegroundColor White
Write-Host ""
Write-Warning "Remember: Never commit .env.local or .env.production to version control!"
