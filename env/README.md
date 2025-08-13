# SplitSetGO Environment Configuration

This folder contains environment configuration files for different deployment stages of the SplitSetGO application.

## 📁 File Structure

```
env/
├── README.md                    # This file
├── .env.example                # Template with all possible variables
├── .env.local.example          # Local development template
├── .env.development            # Development environment
├── .env.staging               # Staging environment  
├── .env.production            # Production environment
└── .env.test                  # Test/CI environment
```

## 🚀 Quick Start

1. **Copy the appropriate template:**
   ```bash
   # For local development
   cp env.local.example .env.local
   
   # For other environments
   cp env.development .env.development
   cp env.staging .env.staging
   cp env.production .env.production
   ```

2. **Fill in your actual API keys and values**

3. **Never commit `.env.local` or `.env.production` to version control**

## 🔑 Required Environment Variables

### Authentication (Clerk)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Public key for Clerk authentication
- `CLERK_SECRET_KEY` - Secret key for Clerk authentication

### Backend (Convex)
- `NEXT_PUBLIC_CONVEX_URL` - Your Convex deployment URL
- `CONVEX_DEPLOY_KEY` - Key for deploying to Convex

### Email (Resend)
- `RESEND_API_KEY` - API key for sending emails
- `NEXT_PUBLIC_BASE_URL` - Your application's base URL

### Background Jobs (Inngest)
- `INNGEST_EVENT_KEY` - Key for Inngest events
- `INNGEST_SIGNING_KEY` - Key for signing Inngest webhooks

## 🌍 Environment-Specific Configurations

### Development (`.env.development`)
- Debug mode enabled
- Mock services for OCR and AI insights
- Local URLs and test keys

### Staging (`.env.staging`)
- Production-like configuration
- Test keys and staging URLs
- Monitoring enabled

### Production (`.env.production`)
- Production keys and URLs
- Debug disabled
- Full monitoring and analytics
- Security headers enabled

### Test (`.env.test`)
- Minimal configuration for testing
- Mock services enabled
- Test-specific keys

## 🔒 Security Best Practices

1. **Never commit sensitive keys to version control**
2. **Use different keys for each environment**
3. **Rotate keys regularly**
4. **Use environment-specific URLs**
5. **Enable security headers in production**

## 🛠️ Environment Detection

The app automatically detects the environment based on:
- `NODE_ENV` (development, staging, production, test)
- `NEXT_PUBLIC_APP_ENV` (local, development, staging, production, test)

## 📱 Mobile Development

For mobile development, ensure:
- `NEXT_PUBLIC_BASE_URL` points to your local IP address
- CORS is properly configured
- SSL certificates are valid for HTTPS

## 🚨 Troubleshooting

### Common Issues:
1. **"Missing publishableKey"** - Check Clerk environment variables
2. **"Invalid Convex URL"** - Verify `NEXT_PUBLIC_CONVEX_URL`
3. **"Resend API key missing"** - Ensure `RESEND_API_KEY` is set
4. **Build failures** - Check all required variables are present

### Debug Mode:
Set `NEXT_PUBLIC_DEBUG=true` to see detailed environment information in the console.

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Convex Documentation](https://docs.convex.dev/)
- [Resend Documentation](https://resend.com/docs)
- [Inngest Documentation](https://www.inngest.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
