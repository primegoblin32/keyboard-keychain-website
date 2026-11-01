# Keyboard Keychain Website

A React + Vite full-screen media gallery with 25 items:
- Animation 1 is a video sequence made from four randomly selected clips.
- Animations 2-25 are full-screen images.
- Four horizontal navigation arrows remain in the same positions and keep the existing navigation behavior.

## Requirements

- Node.js 22 LTS (or another current supported Node.js version)
- VS Code or another code editor
- GitHub account for hosting

## Run locally

Open this folder in VS Code, then choose **Terminal → New Terminal**.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

Build and preview the production version:

```bash
npm run build
npm run preview
```

## Add the Animation 1 video clips

Put 8 short MP4 clips in `public/videos/animation-01-clips/`, named `clip-01.mp4` through `clip-08.mp4`.

When Animation 1 is shown, the website randomly selects 4 different clips from that pool, plays those 4 clips one after another, then repeats the same sequence. Returning to Animation 1 selects a new random set of 4. To change the pool size or filenames, edit `ANIMATION_ONE_CLIPS` in `src/animations.js`. Keep at least 4 clips in the pool.

Each clip should contain its own audio. Browsers generally block autoplay with sound until the visitor interacts with the page, so Animation 1 displays **Start with sound**. After that first click, the clips play with sound.

For broad browser compatibility, H.264 video with AAC audio in an MP4 container is recommended.

## Add the 24 images

Put the 24 images in `public/images/`, named `animation-02.jpg` through `animation-25.jpg`. The images are full-screen and use `object-fit: cover`, which fills the screen but may crop image edges to match the screen's aspect ratio. You can use PNG or WebP instead, but update the filenames in `src/animations.js`.

## Navigation

The four horizontal arrow buttons retain the existing behavior: the upper pair changes the vertical position in the 5 × 5 navigation layout, and the lower pair changes the horizontal position. Both left-side arrows point left and both right-side arrows point right. Navigation wraps around at the edges.

## Deploy to GitHub Pages

1. Create a GitHub repository, for example `animation-website`.
2. Push the entire project to its `main` branch.
3. In the repository, open **Settings → Pages**.
4. Set **Build and deployment → Source** to **GitHub Actions**.
5. The included `.github/workflows/deploy.yml` builds and deploys the site on each push to `main`.
6. Open the published URL from the Pages settings or the completed Actions deployment.

The Vite config uses `base: './'`, so asset paths work on localhost and GitHub Pages.

## Important

This starter contains placeholder instructions, not your actual video clips or images. Add your media files before testing the gallery. GitHub Pages is static hosting, so keep video file sizes sensible.
