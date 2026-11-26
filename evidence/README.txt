LIGHTHOUSE AUDIT EVIDENCE DIRECTORY
==================================

Place your Chrome DevTools Lighthouse audit screenshots in this folder:

1. Problem1.png
   - Screenshot of an initial Lighthouse audit run (Mobile or Desktop) highlighting any issues discovered before optimisation (e.g., contrast, missing meta description, image dimensions, or ARIA label warnings).

2. Fix1.png
   - Screenshot of the follow-up Lighthouse audit after resolving the issues, demonstrating 95+ scores across Performance, Accessibility, Best Practices, and SEO.

How to Capture in Google Chrome:
1. Serve the project over HTTP (e.g., `npx serve` or `python -m http.server 8080`).
2. Open `http://localhost:8080/pages/index.html` (and test `attractions.html`, `favourites.html`, `about.html`, `contact.html`) in an Incognito window.
3. Open DevTools (F12) -> Lighthouse tab -> Select Performance, Accessibility, Best Practices, SEO -> Click "Analyze page load".
4. Save screenshots as `Problem1.png` and `Fix1.png` inside this `evidence/` directory.
