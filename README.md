# Portfolio Website for Cloudflare Pages

A clean, elegant portfolio website designed for easy deployment on Cloudflare Pages.

## 📁 Files Included

- `index.html` - Main HTML structure
- `style.css` - All styling and animations
- `script.js` - Interactive features
- `README.md` - This file!

## 🎨 Customizing Your Site

### 1. Replace Your Image
- Add your image file to the same folder as these files
- Name it `your-image.jpg` (or update the filename in `index.html` line 53)
- Recommended: Use a high-quality image (at least 1200px wide)

### 2. Update Your Text
Open `index.html` and replace:
- Line 20: "Your Name" (appears in navigation)
- Lines 28-30: Your headline text
- Lines 34-36: Your description paragraphs
- Line 40: Email link
- Line 54: Image alt text
- Line 56-57: Project caption
- Lines 66-68: Social media links
- Line 70: Copyright text

### 3. Customize Colors (Optional)
Open `style.css` and edit the CSS variables at the top (lines 1-11):
- `--color-background`: Page background color
- `--color-accent`: Button and accent color
- You can use color picker tools online to get hex codes

## 🚀 Deployment Instructions

### Step 1: Create a GitHub Account (if you don't have one)
1. Go to https://github.com
2. Click "Sign up" and follow the steps
3. Verify your email

### Step 2: Create a New Repository
1. After logging in, click the "+" icon in top right
2. Click "New repository"
3. Name it something like "portfolio" or "my-portfolio"
4. Select "Public" (required for free Cloudflare Pages)
5. Click "Create repository"

### Step 3: Upload Your Files
1. On your new repository page, click "uploading an existing file"
2. Drag and drop these files:
   - `index.html`
   - `style.css`
   - `script.js`
   - Your image file (e.g., `your-image.jpg`)
3. Add a commit message like "Initial portfolio upload"
4. Click "Commit changes"

### Step 4: Set Up Cloudflare Pages
1. Go to https://pages.cloudflare.com
2. Sign up for a free account (or log in)
3. Click "Create a project"
4. Click "Connect to Git"
5. Click "Connect GitHub" and authorize Cloudflare
6. Select your portfolio repository
7. Configure your build:
   - **Project name**: Choose a name (this will be your subdomain)
   - **Production branch**: `main` or `master`
   - **Build command**: Leave empty
   - **Build output directory**: `/`
8. Click "Save and Deploy"

Your site will be live in 1-2 minutes at: `your-project-name.pages.dev`

### Step 5: Connect Your Squarespace Domain
1. In Cloudflare Pages, go to your project
2. Click the "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter your domain (e.g., `yourdomain.com`)
5. Cloudflare will provide DNS records:
   - **CNAME record**: `www` pointing to `your-project.pages.dev`
   - **A record**: `@` with provided IP addresses

6. In your Squarespace Domains dashboard:
   - Go to DNS Settings
   - Remove existing records for `@` and `www`
   - Add the DNS records Cloudflare provided
   - Save changes

7. DNS changes take 24-48 hours to fully propagate (but often work within an hour)

## 🔄 Making Updates

After your initial setup, updating your site is easy:

1. Go to your GitHub repository
2. Click on the file you want to edit (e.g., `index.html`)
3. Click the pencil icon (Edit this file)
4. Make your changes
5. Scroll down and click "Commit changes"
6. Cloudflare automatically rebuilds your site in ~1 minute

## 💡 Tips

- **Test locally**: Double-click `index.html` to preview in your browser before uploading
- **Image optimization**: Use tools like TinyPNG to compress images before uploading
- **Mobile-friendly**: This template is fully responsive - test on your phone!
- **Free hosting**: Cloudflare Pages includes unlimited bandwidth and automatic SSL
- **Custom email**: You can set up email forwarding through Cloudflare Email Routing (free)

## 🆘 Troubleshooting

**My image isn't showing:**
- Make sure the filename in `index.html` matches your image filename exactly (case-sensitive)
- Make sure you uploaded the image to GitHub

**DNS not working:**
- Wait 24-48 hours for DNS propagation
- Double-check the DNS records match what Cloudflare provided
- Try visiting the .pages.dev URL to confirm the site works

**Changes not appearing:**
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait a minute for Cloudflare to rebuild
- Check the GitHub commit went through

## 📚 Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Docs](https://docs.github.com)
- [HTML Color Picker](https://htmlcolorcodes.com/)
- [Google Fonts](https://fonts.google.com/) - To change typography

## 🎉 You're Done!

You now have a professional portfolio website that:
- ✅ Costs $0 to host
- ✅ Loads incredibly fast
- ✅ Is easy to update
- ✅ Works on all devices
- ✅ Has automatic SSL/HTTPS

Need help? Create an issue on GitHub or reach out to the Cloudflare community!
