# GitHub Setup Guide - Interactive Venue Square

Follow these steps to create a new GitHub repository and push this project.

## Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `interactive-venue-square` (or your preferred name)
   - **Description**: "Interactive 2x2 venue square with animated break-apart effect"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Update package.json

Open `package.json` and update the `homepage` field with your GitHub info:

```json
"homepage": "https://github.com/steisaden/squareSpaceComponent.git"
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## Step 3: Initialize Git and Push to GitHub

Open your terminal in the `InteractiveVenueSquareElement` folder and run these commands:

### Initialize Git
```bash
c
```

### Add all files
```bash
git add .
```

### Create first commit
```bash
git commit -m "Initial commit: Interactive Venue Square with animated 2x2 grid"
```

### Rename branch to main
```bash
git branch -M main
```

### Add remote repository
```bash
git remote add origin https://github.com/steisaden/squareSpaceComponent.git
```
**Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username**

### Push to GitHub
```bash
git push -u origin main
```

## Step 4: Install Deployment Package

```bash
npm install --save-dev gh-pages
```

## Step 5: Deploy to GitHub Pages

```bash
npm run deploy
```

This will build your project and deploy it to GitHub Pages.

## Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down and click **"Pages"** in the left sidebar
4. Under **"Source"**, select the **`gh-pages`** branch
5. Click **"Save"**

## Step 7: View Your Live Site

After a few minutes, your site will be live at:
```
https://YOUR_GITHUB_USERNAME.github.io/interactive-venue-square
```

---

## Quick Reference Commands

### First time setup:
```bash
cd InteractiveVenueSquareElement
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/interactive-venue-square.git
git push -u origin main
npm install --save-dev gh-pages
npm run deploy
```

### Future updates:
```bash
git add .
git commit -m "Description of your changes"
git push origin main
npm run deploy
```

---

## Troubleshooting

### If you get authentication errors:
- You may need to use a Personal Access Token instead of your password
- Go to GitHub Settings → Developer settings → Personal access tokens
- Generate a new token with `repo` permissions
- Use the token as your password when prompted

### If the site shows a blank page:
- Make sure you updated the `homepage` field in `package.json`
- Check that GitHub Pages is enabled and using the `gh-pages` branch
- Wait a few minutes for GitHub to build and deploy

### If you need to change the remote URL:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

---

## Project Features

This project includes:
- ✨ Animated 2x2 grid that starts as a single cube and breaks apart
- 🎨 UV-mapped high-resolution logo split across 4 squares
- 🖱️ Interactive hover effects on each square
- 🔗 Clickable links to different venue spaces
- 📱 Responsive 3D visualization using Three.js and React Three Fiber
- 🎭 Smooth animations with cubic easing

Enjoy your deployed site! 🚀
