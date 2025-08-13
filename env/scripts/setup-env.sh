#!/bin/bash

# SplitSetGO Environment Setup Script
# This script helps you set up environment files for different deployment stages

set -e

echo "🚀 SplitSetGO Environment Setup"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "env" ]; then
    print_error "Please run this script from the root of your SplitSetGO project"
    exit 1
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    print_info "Creating .env.local from template..."
    cp env/env.local.example .env.local
    print_status "Created .env.local"
else
    print_warning ".env.local already exists, skipping..."
fi

# Function to setup environment file
setup_env() {
    local env_name=$1
    local template_file="env/env.${env_name}"
    local target_file=".env.${env_name}"
    
    if [ -f "$target_file" ]; then
        print_warning ".env.${env_name} already exists, skipping..."
        return
    fi
    
    if [ -f "$template_file" ]; then
        cp "$template_file" "$target_file"
        print_status "Created .env.${env_name}"
    else
        print_error "Template $template_file not found"
    fi
}

# Setup different environment files
print_info "Setting up environment files..."
setup_env "development"
setup_env "staging"
setup_env "production"
setup_env "test"

# Create .env.example if it doesn't exist
if [ ! -f ".env.example" ]; then
    print_info "Creating .env.example..."
    cp env/env.example .env.example
    print_status "Created .env.example"
fi

# Check for required tools
print_info "Checking for required tools..."

# Check if git is available
if command -v git &> /dev/null; then
    print_status "Git is available"
    
    # Add .env files to .gitignore if not already there
    if [ -f ".gitignore" ]; then
        if ! grep -q "\.env\.local" .gitignore; then
            echo "" >> .gitignore
            echo "# Environment files" >> .gitignore
            echo ".env.local" >> .gitignore
            echo ".env.production" >> .gitignore
            echo ".env.staging" >> .gitignore
            echo ".env.development" >> .gitignore
            echo ".env.test" >> .gitignore
            print_status "Added environment files to .gitignore"
        fi
    fi
else
    print_warning "Git not found, skipping .gitignore update"
fi

# Check if node is available
if command -v node &> /dev/null; then
    print_status "Node.js is available (version: $(node --version))"
else
    print_error "Node.js not found. Please install Node.js to continue."
    exit 1
fi

# Check if npm is available
if command -v npm &> /dev/null; then
    print_status "npm is available (version: $(npm --version))"
else
    print_error "npm not found. Please install npm to continue."
    exit 1
fi

echo ""
echo "🎉 Environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your actual API keys"
echo "2. Run 'npm install' to install dependencies"
echo "3. Run 'npm run dev' to start development server"
echo ""
echo "📚 For more information, see env/README.md"
echo ""
print_warning "Remember: Never commit .env.local or .env.production to version control!"
