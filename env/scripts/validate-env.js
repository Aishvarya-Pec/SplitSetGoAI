#!/usr/bin/env node

/**
 * SplitSetGO Environment Validation Script
 * This script validates environment variables and checks for missing required values
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// Required environment variables by environment
const requiredVars = {
    all: [
        'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
        'CLERK_SECRET_KEY',
        'NEXT_PUBLIC_CONVEX_URL',
        'CONVEX_DEPLOY_KEY',
        'RESEND_API_KEY',
        'NEXT_PUBLIC_BASE_URL'
    ],
    production: [
        'NEXTAUTH_SECRET',
        'NEXTAUTH_URL'
    ],
    staging: [
        'NEXTAUTH_SECRET',
        'NEXTAUTH_URL'
    ]
};

// Optional environment variables
const optionalVars = [
    'INNGEST_EVENT_KEY',
    'INNGEST_SIGNING_KEY',
    'GOOGLE_AI_API_KEY',
    'OPENAI_API_KEY',
    'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID',
    'NEXT_PUBLIC_POSTHOG_KEY',
    'NEXT_PUBLIC_SENTRY_DSN'
];

function printHeader() {
    console.log(`${colors.cyan}${colors.bright}🚀 SplitSetGO Environment Validation${colors.reset}`);
    console.log(`${colors.cyan}========================================${colors.reset}\n`);
}

function printStatus(message, type = 'info') {
    const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠' : type === 'error' ? '✗' : 'ℹ';
    const color = type === 'success' ? colors.green : type === 'warning' ? colors.yellow : type === 'error' ? colors.red : colors.blue;
    
    console.log(`${color}${icon}${colors.reset} ${message}`);
}

function loadEnvFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            return {};
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        const env = {};
        
        content.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...valueParts] = trimmed.split('=');
                if (key && valueParts.length > 0) {
                    env[key] = valueParts.join('=');
                }
            }
        });
        
        return env;
    } catch (error) {
        printStatus(`Error reading ${filePath}: ${error.message}`, 'error');
        return {};
    }
}

function validateEnvVars(env, envName) {
    const missing = [];
    const empty = [];
    const valid = [];
    
    // Check required variables
    const required = [...requiredVars.all, ...(requiredVars[envName] || [])];
    
    required.forEach(key => {
        if (!(key in env)) {
            missing.push(key);
        } else if (!env[key] || env[key].includes('your_') || env[key].includes('test_key')) {
            empty.push(key);
        } else {
            valid.push(key);
        }
    });
    
    // Check optional variables
    optionalVars.forEach(key => {
        if (key in env && env[key] && !env[key].includes('your_') && !env[key].includes('test_key')) {
            valid.push(key);
        }
    });
    
    return { missing, empty, valid };
}

function printValidationResults(envName, results) {
    console.log(`${colors.bright}${colors.blue}${envName.toUpperCase()} Environment:${colors.reset}`);
    
    if (results.missing.length > 0) {
        printStatus(`Missing required variables: ${results.missing.join(', ')}`, 'error');
    }
    
    if (results.empty.length > 0) {
        printStatus(`Empty or placeholder variables: ${results.empty.join(', ')}`, 'warning');
    }
    
    if (results.valid.length > 0) {
        printStatus(`Valid variables: ${results.valid.length}`, 'success');
    }
    
    console.log('');
}

function main() {
    printHeader();
    
    const envFiles = [
        { name: 'local', path: '.env.local' },
        { name: 'development', path: '.env.development' },
        { name: 'staging', path: '.env.staging' },
        { name: 'production', path: '.env.production' },
        { name: 'test', path: '.env.test' }
    ];
    
    let hasErrors = false;
    let hasWarnings = false;
    
    envFiles.forEach(({ name, path: filePath }) => {
        const env = loadEnvFile(filePath);
        if (Object.keys(env).length === 0) {
            printStatus(`No environment file found: ${filePath}`, 'warning');
            console.log('');
            return;
        }
        
        const results = validateEnvVars(env, name);
        printValidationResults(name, results);
        
        if (results.missing.length > 0) {
            hasErrors = true;
        }
        
        if (results.empty.length > 0) {
            hasWarnings = true;
        }
    });
    
    // Summary
    console.log(`${colors.bright}${colors.cyan}Summary:${colors.reset}`);
    
    if (hasErrors) {
        printStatus('Environment validation failed. Please fix missing variables.', 'error');
    } else if (hasWarnings) {
        printStatus('Environment validation passed with warnings. Some variables need values.', 'warning');
    } else {
        printStatus('Environment validation passed successfully!', 'success');
    }
    
    console.log('');
    
    if (hasErrors || hasWarnings) {
        console.log(`${colors.yellow}Next steps:${colors.reset}`);
        console.log('1. Copy env/env.local.example to .env.local');
        console.log('2. Fill in your actual API keys and values');
        console.log('3. Run this script again to validate');
        console.log('');
        console.log(`${colors.cyan}For more information, see env/README.md${colors.reset}`);
    }
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { validateEnvVars, loadEnvFile };
