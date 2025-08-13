# 🚀 VSCode Setup Guide for SplitSetGO

## ✅ Fixed Issues
- **Removed `--turbopack` flag** from package.json (was causing errors)
- **Created optimized VSCode workspace settings**
- **Added recommended extensions**
- **Configured debugging**

## 🛠️ Quick Setup

### 1. Install Required Extensions
VSCode will prompt you to install recommended extensions, or install manually:

**Essential Extensions:**
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **ESLint** - Code linting
- **GitLens** - Git integration
- **Auto Rename Tag** - HTML/JSX tag renaming

### 2. Environment Setup
```bash
# Copy environment template
cp env.local.example .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 VSCode Features

### Auto-formatting
- **Format on Save** enabled
- **ESLint auto-fix** on save
- **Import organization** on save

### Tailwind CSS
- **IntelliSense** for classes
- **Hover previews** for colors
- **Auto-completion** for utilities

### Git Integration
- **Auto-fetch** every 3 minutes
- **Smart commits** enabled
- **Git Graph** visualization

### Debugging
- **Server-side debugging** (Node.js)
- **Client-side debugging** (Chrome)
- **Full-stack debugging** (both)

## 🔧 Workspace Settings

### Editor
- **Tab size**: 2 spaces
- **Word wrap**: enabled
- **Bracket pair colorization**: enabled
- **Auto save**: on focus change

### Search
- **Excludes**: node_modules, .next, convex/_generated
- **Smart search** with file type detection

### Terminal
- **Default**: PowerShell (Windows)
- **Git auto-fetch**: enabled

## 🚨 Troubleshooting

### If `npm run dev` still fails:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try again
npm run dev
```

### If VSCode extensions don't work:
1. **Reload VSCode** (Ctrl+Shift+P → "Developer: Reload Window")
2. **Check extension status** in Extensions panel
3. **Verify workspace** is opened at root level

## 🎨 Recommended VSCode Theme
- **Dark theme**: "GitHub Dark" or "One Dark Pro"
- **Icon theme**: "Material Icon Theme"
- **Font**: "JetBrains Mono" or "Fira Code"

## 📱 Keyboard Shortcuts

### Essential Shortcuts:
- **Ctrl+Shift+P**: Command palette
- **Ctrl+Shift+F**: Search across files
- **Ctrl+P**: Quick file open
- **Ctrl+Shift+E**: Explorer
- **Ctrl+Shift+X**: Extensions
- **Ctrl+Shift+G**: Git
- **F5**: Start debugging

### SplitSetGO Specific:
- **Ctrl+Shift+P → "Tailwind CSS: Show CSS"**: View generated CSS
- **Ctrl+Shift+P → "ESLint: Fix all auto-fixable Problems"**: Auto-fix issues

## 🌟 Pro Tips

1. **Use Command Palette** for everything (Ctrl+Shift+P)
2. **Enable Auto Save** for seamless development
3. **Use GitLens** for detailed Git history
4. **Customize your theme** for better productivity
5. **Use workspace settings** for team consistency

## 🔗 Resources

- [VSCode Documentation](https://code.visualstudio.com/docs)
- [Next.js VSCode Guide](https://nextjs.org/docs/advanced-features/debugging)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

**Happy coding with SplitSetGO! 🎉**
