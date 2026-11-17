NAVO JARVIS — VERCEL DEPLOYMENT GUIDE
====================================

This is a static website. No Python, Node.js, build command, or Windows installer is required to deploy it using the Vercel website.

PACKAGE CONTENTS
- index.html                 Main website
- style.css                  Design and layout
- app.js                     Assistant, speech and writing features
- manifest.webmanifest       Installable web app metadata
- sw.js                      Offline cache/service worker
- icons/icon.svg             Website icon
- vercel.json                Vercel hosting configuration

METHOD 1 — DEPLOY WITH GITHUB (RECOMMENDED)
1. Extract NAVO_JARVIS_VERCEL.zip on your computer.
2. Open https://github.com and sign in or create an account.
3. Click the + button (top-right) and choose New repository.
4. Repository name: navo-jarvis
5. Choose Public or Private, then click Create repository.
6. On the new repository page, choose “uploading an existing file”.
7. Open the extracted NAVO_JARVIS_VERCEL folder on your computer.
8. Select and upload the CONTENTS of that folder — index.html, app.js, style.css, vercel.json, manifest.webmanifest, sw.js, README files and the icons folder. Do not upload only the ZIP file.
9. Click Commit changes.
10. Open https://vercel.com and sign in with GitHub.
11. Click Add New… > Project.
12. Import the navo-jarvis GitHub repository.
13. In Configure Project, use these settings:
    Framework Preset: Other
    Root Directory: ./
    Build Command: leave empty / Override off
    Output Directory: leave empty / Override off
    Install Command: leave empty / Override off
14. Click Deploy.
15. Wait for deployment to finish. Click Visit to open your live website.

METHOD 2 — VERCEL CLI (OPTIONAL; REQUIRES NODE.JS)
The GitHub method above is easier and does not require installing anything locally. If you already have Node.js installed, you can use the Vercel CLI from this folder with:
    npx vercel
Follow the prompts, then run:
    npx vercel --prod

AFTER DEPLOYMENT — TEST IT
1. Open the HTTPS Vercel URL in a supported browser.
2. Click “Hear greeting” to test speech output. Browsers may block automatic sound until a user interacts with the page.
3. Click “Start listening” and allow microphone permission if asked.
4. Open Writing Studio, type a sentence, then test Read aloud, Copy text and Download .txt.
5. Test Google and YouTube actions.
6. If you update files in GitHub, Vercel automatically redeploys the site.

IMPORTANT LIMITATIONS
- This is a browser-based assistant, not a full Windows JARVIS application or a connected ChatGPT-like AI model.
- Speech recognition availability varies by browser and operating system. It may require an internet connection.
- A website cannot type into other Windows applications, control the desktop, launch arbitrary Windows programs, or change Windows volume. Copy text and paste it into another app, or download a TXT file.
- No always-on wake word or guaranteed offline speech recognition is included.
- Windows 7 is obsolete and current browsers may not support it. A Vercel HTTPS link does not guarantee microphone or speech API compatibility on Windows 7. Test the deployed site in the browser you intend to use.
