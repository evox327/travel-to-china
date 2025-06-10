# PWA App Icons

This directory contains all the required app icons for the Progressive Web App (PWA) functionality.

## Required Icon Sizes

The following icon sizes are needed for optimal PWA support across different devices and platforms:

### Android Icons
- 72x72 (ldpi)
- 96x96 (mdpi)  
- 128x128 (hdpi)
- 144x144 (xhdpi)
- 152x152 (xxhdpi)
- 192x192 (xxxhdpi) - **Required**
- 384x384 (4x)
- 512x512 (5x) - **Required**

### iOS Icons
- 120x120 (iPhone)
- 152x152 (iPad)
- 167x167 (iPad Pro)
- 180x180 (iPhone Plus)

## Icon Requirements

1. **Format**: PNG format with transparent background
2. **Design**: Simple, recognizable design that works at small sizes
3. **Content**: Should represent the "Discover China" brand
4. **Color**: Primary color should be the app's theme color (#dc2626)
5. **Maskable**: Icons should work with adaptive icon masks on Android

## Recommended Icon Content

The icon should feature:
- 🇨🇳 Chinese flag elements or colors (red)
- 🏛️ Architectural elements (pagoda, Great Wall silhouette)
- 🗺️ Map pin or location marker
- ✈️ Travel/tourism symbols

## Current Status

**⚠️ Icons are currently placeholders**

To complete the PWA setup, you need to:

1. Design and create actual icons in all required sizes
2. Replace the placeholder icon references in `/public/manifest.json`
3. Update the `apple-touch-icon` reference in the layout
4. Test icons on various devices and platforms

## Tools for Icon Generation

- [PWA Icon Generator](https://progressivewebapp.store/pwa-icon-generator)
- [App Icon Generator](https://appicon.co/)
- [Favicon Generator](https://favicon.io/)
- [PWA Builder](https://pwabuilder.com/)

## Testing

After adding icons:
1. Test on Android Chrome (install prompt)
2. Test on iOS Safari (add to home screen)
3. Verify icons appear correctly in app switcher
4. Check that maskable icons work properly on supported devices