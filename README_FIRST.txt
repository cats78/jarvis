NAVO JARVIS WEB COMPLETE
========================

This is a browser-only assistant and writing workspace. No Python or Windows installer is needed.

FEATURES
- JARVIS welcome greeting and speech synthesis (browser autoplay policies may block automatic speech until first interaction; use Hear greeting).
- Browser speech recognition where supported; may rely on online speech services.
- Typed assistant commands and web searches.
- Writing Studio with voice dictation, text editing, templates, word/character count, read aloud, copy and TXT download.
- PWA manifest and service worker for installable website/offline cached interface.

IMPORTANT LIMITATIONS
- Website cannot type into external Windows programs, operate other apps, control mouse/keyboard outside the page, set Windows volume, access arbitrary files or run at Windows startup. It can copy text for pasting into another app and download a TXT file.
- "AI" generation, factual conversation and advanced grammar correction are not connected to an AI backend in this package. It uses built-in commands/templates, not a full language model.
- No reliable always-on wake word or offline speech recognition is included.
- Microphone and PWA features generally require HTTPS or localhost and a compatible modern browser. Windows 7-era browsers may not support these APIs.

PUBLISH
1. Upload all files in this folder to a GitHub repository.
2. Settings > Pages > Deploy from branch > main > /(root).
3. Open the HTTPS URL.
4. Allow microphone permission. If automatic greeting is blocked, click Hear greeting.
5. Use Chrome/Edge install option where available. PWABuilder: https://www.pwabuilder.com/

WRITING
Open Writing Studio. Type or press Dictate. Select a template if useful. Use Copy text to paste elsewhere or Download .txt to save a document.
