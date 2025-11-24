#!/bin/bash

echo "🧹 Cleaning old builds..."
rm -rf dist

echo "🔨 Building project..."
npm run build

echo "📦 Deploying to GitHub Pages..."
npx gh-pages -d dist -t true -f

echo "✅ Deploy complete! Your site will be live in a few minutes at:"
echo "https://steisaden.github.io/squareSpaceComponent/"
echo ""
echo "If you still see errors, wait 2-3 minutes and hard refresh (Cmd+Shift+R)"
