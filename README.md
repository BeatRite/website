# BeatRite Website

A modern, responsive website for BeatRite's predictive healthcare monitoring technology.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Opens the development server at `http://localhost:3000`

### Build for Production
```bash
npm run build
```
Creates optimized files in the `dist/` directory

### Preview Production Build
```bash
npm run preview
```
Serves the production build at `http://localhost:3001`

## 📁 Project Structure

```
beatrite-website/
├── src/                    # Source HTML files
│   └── index.html         # Main HTML file
├── assets/                # Static assets
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   └── images/           # Images and media
├── dist/                 # Production build (generated)
├── package.json          # Project configuration
└── README.md            # This file
```

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run all linters
- `npm run lint:html` - Lint HTML files
- `npm run lint:css` - Lint CSS files
- `npm run lint:js` - Lint JavaScript files
- `npm run optimize` - Optimize CSS and JS for production
- `npm run deploy` - Build and optimize for deployment

## 🏗 Build Process

The build process:
1. Cleans the `dist/` directory
2. Copies HTML files from `src/`
3. Copies CSS files from `assets/css/`
4. Copies JavaScript files from `assets/js/`
5. Copies images from `assets/images/`

For production deployment, also run:
```bash
npm run optimize
```
This creates minified versions of CSS and JavaScript files.

## 🎨 Development

### Code Quality
The project includes:
- ESLint for JavaScript linting
- Stylelint for CSS linting
- HTMLHint for HTML validation

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- No Internet Explorer support
- Mobile responsive design

## 🚀 Deployment

### Static Hosting (Recommended)
The built website can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Cloudflare Pages

### Deployment Steps
1. Run `npm run deploy` to build and optimize
2. Upload the `dist/` folder contents to your hosting service
3. Configure your hosting service to serve `index.html` as the default page

### Environment Configuration
For production deployment, consider:
- Setting up proper cache headers for assets
- Configuring GZIP compression
- Setting up CDN for global delivery
- Adding analytics tracking
- Setting up proper redirects and error pages

## Legacy Development (Python Server)
For simple development without Node.js:
```bash
python3 -m http.server 8000
```

## 📝 License

MIT License - see LICENSE file for details.

