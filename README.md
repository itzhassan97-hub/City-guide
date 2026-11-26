# Discover Manchester — City Guide Website

A responsive, accessible, multi-page City Guide website for **Manchester**, built exclusively with **vanilla HTML5, CSS3, and ES6+ JavaScript** (zero frameworks, zero external CSS/JS libraries).

## Project Folder Structure

```text
manchester-city-guide/
├── css/
│   └── style.css                # Mobile-first stylesheet (CSS Grid, Flexbox, Custom Properties)
├── evidence/
│   └── README.txt               # Instructions for Problem1.png & Fix1.png Lighthouse screenshots
├── js/
│   └── script.js                # ES6+ DOM logic (nav toggle, search, filters, modal, localStorage, validation)
├── media/
│   └── images/
│       ├── art-gallery.svg
│       ├── canal-grid-pattern.svg
│       ├── castlefield-viaduct.svg
│       ├── heaton-park.svg
│       ├── hero-manchester.svg
│       ├── john-rylands.svg
│       ├── mackie-mayor.svg
│       ├── northern-quarter.svg
│       ├── science-industry.svg
│       └── the-lowry.svg
├── pages/
│   ├── index.html               # Home page (hero, Manchester highlights, 3 featured attractions)
│   ├── attractions.html         # Searchable & filterable directory of 8 Manchester attractions
│   ├── favourites.html          # My Saved Places page backed by localStorage
│   ├── about.html               # History, culture, neighbourhoods, seasons & Bee Network tips
│   └── contact.html             # Accessible visitor enquiry form with live DOM validation
└── README.md                    # Project overview and local setup guide
```

## Key Features

- **Pure Vanilla Stack:** Semantic HTML5, mobile-first CSS3 (`768px` tablet & `1024px+` desktop breakpoints), and modular ES6+ DOM manipulation.
- **Persistent Favourites (`localStorage`):** Save or remove attractions from `index.html`, `attractions.html`, `favourites.html`, or inside the attraction detail modal—with a live counter badge (`#nav-fav-count`) synced across all 5 pages.
- **Real-Time Search & Category Filtering:** Filter 8 curated Manchester attractions (`Landmark`, `Museum`, `Park`, `Culture`, `Food`, `Shopping`) by keyword, neighbourhood, or category, with live result counts and an empty-state reset button.
- **Accessible Attraction Detail Modal:** Clicking **View Details** opens a keyboard-accessible dialog (`Escape` to close, focus restoration, `aria-expanded`, `aria-modal="true"`) showing opening hours, admission pricing, nearest Metrolink stop, and insider tips.
- **Client-Side Form Validation:** `pages/contact.html` validates required fields, email format, non-past visit date, and minimum message length (`20+` characters) with `aria-live="polite"` inline errors and a dynamic confirmation summary.
- **Accessibility & SEO Ready:** WCAG AA/AAA colour contrast, skip-to-content links, `:focus-visible` rings, descriptive `alt` attributes, `<label for="...">` bindings, Open Graph tags, and explicit image dimensions.

## How to Run Locally

Because `localStorage` and relative paths work most reliably over HTTP (and Lighthouse requires HTTP), serve the project root folder with any lightweight static server:

### Option 1: Python (Built-in)
1. Open a terminal inside `manchester-city-guide/`:
   ```bash
   python -m http.server 8080
   ```
2. Open your browser to:
   `http://localhost:8080/pages/index.html`

### Option 2: Node.js (`serve`)
1. Open a terminal inside `manchester-city-guide/`:
   ```bash
   npx serve .
   ```
2. Open the displayed local URL and navigate to `/pages/index.html`.

### Option 3: VS Code Live Server
1. Open the `manchester-city-guide` folder in VS Code.
2. Open `pages/index.html` and click **Go Live** in the bottom status bar.
