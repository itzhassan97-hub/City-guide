/**
 * Discover Manchester — Main Interactive Script (Vanilla ES6+ DOM)
 * Handles mobile navigation, persistent favourites (localStorage),
 * attractions search & category filtering, accessible detail modal,
 * favourites management, and client-side contact form validation.
 */

'use strict';

/* ==========================================================================
   1. Attractions Data Store
   ========================================================================== */
const ATTRACTIONS = [
  {
    id: 'john-rylands',
    name: 'John Rylands Research Institute and Library',
    category: 'Landmark',
    neighbourhood: 'Deansgate',
    shortDescription:
      'A breathtaking Victorian Neo-Gothic masterpiece housing rare manuscripts, stained glass, and the cathedral-like Historic Reading Room.',
    fullDescription:
      'Opened in 1900 as a memorial to industrialist John Rylands, this Grade I-listed sandstone landmark on Deansgate is one of the finest examples of Neo-Gothic architecture in Europe. Step inside to explore vaulted stone galleries, world-famous rare books—including the oldest known New Testament fragment—and rotating exhibitions.',
    image: '../media/images/john-rylands.svg',
    alt: 'Illustration of the John Rylands Library sandstone Neo-Gothic facade and glowing stained-glass lancet windows',
    hours: 'Wednesday – Saturday: 10:00 – 17:00 (Closed Sun–Tue)',
    pricing: 'Free entry (donations welcome)',
    transport: 'Metrolink: St Peter\'s Square or Deansgate-Castlefield (6-min walk)',
    tip: 'Visit right at 10:00 opening time to photograph the Historic Reading Room before tour groups arrive.'
  },
  {
    id: 'science-industry',
    name: 'Science and Industry Museum',
    category: 'Museum',
    neighbourhood: 'Castlefield',
    shortDescription:
      'Explore 250 years of revolutionary ideas, steam power, textiles, and early computing on the site of the world\'s oldest passenger railway.',
    fullDescription:
      'Built around the historic 1830 Liverpool Road Station, the Science and Industry Museum tells the story of how Manchester sparked the Industrial Revolution. Highlights include working cotton mill demonstrations, the interactive Experiment gallery, and a replica of "Baby", the world\'s first stored-program computer.',
    image: '../media/images/science-industry.svg',
    alt: 'Illustration of the red-brick Science and Industry Museum railway warehouse with a gold steam locomotive wheel emblem',
    hours: 'Daily: 10:00 – 17:00',
    pricing: 'Free general admission (free timed ticket recommended)',
    transport: 'Metrolink: Deansgate-Castlefield (5-min walk)',
    tip: 'Catch the daily textile machinery demonstration in the Textiles Gallery to hear historic looms in action.'
  },
  {
    id: 'northern-quarter',
    name: 'Northern Quarter & Afflecks',
    category: 'Shopping',
    neighbourhood: 'Northern Quarter',
    shortDescription:
      'Manchester\'s creative heart packed with independent boutiques, vintage emporiums, vinyl record stores, and vibrant street murals.',
    fullDescription:
      'Set among red-brick Victorian cotton warehouses between Piccadilly and Ancoats, the Northern Quarter is famous for its fiercely independent spirit. Browse four floors of eclectic stalls inside Afflecks, hunt for rare LPs on Oldham Street, and spot ever-changing street art around Stevenson Square.',
    image: '../media/images/northern-quarter.svg',
    alt: 'Illustration of Northern Quarter Victorian brick buildings with colourful geometric street art and shopfronts',
    hours: 'Afflecks: Mon–Sat 10:30 – 18:00, Sun 11:00 – 17:00; Streets open 24/7',
    pricing: 'Free to explore',
    transport: 'Metrolink: Market Street or Piccadilly Gardens (4-min walk)',
    tip: 'Look up above eye level along Tib Street and Thomas Street to spot hidden mosaic tiles and brick ghost signs.'
  },
  {
    id: 'heaton-park',
    name: 'Heaton Park',
    category: 'Park',
    neighbourhood: 'Higher Blackley (North Manchester)',
    shortDescription:
      'One of Europe\'s largest municipal parks featuring 600 acres of rolling woodland, an 18th-century hall, boating lake, and heritage trams.',
    fullDescription:
      'Spanning over 600 acres north of the city centre, Heaton Park offers sweeping views across Greater Manchester alongside formal gardens, an animal centre, a lakeside café, and the Grade I-listed neoclassical Heaton Hall. On weekends, volunteers operate restored vintage trams along the park\'s historic track.',
    image: '../media/images/heaton-park.svg',
    alt: 'Illustration of Heaton Park\'s neoclassical Heaton Hall overlooking rolling green hills and a blue boating lake',
    hours: 'Daily: 08:00 – Dusk',
    pricing: 'Free park entry (boating and tramway rides carry small fees)',
    transport: 'Metrolink: Heaton Park station (Bury line, direct from city centre in 18 mins)',
    tip: 'Walk up to The Temple, the park\'s highest point, for panoramic views across the Pennines and city skyline.'
  },
  {
    id: 'the-lowry',
    name: 'The Lowry & Salford Quays',
    category: 'Culture',
    neighbourhood: 'Salford Quays',
    shortDescription:
      'Striking waterfront arts complex housing the world\'s largest collection of L.S. Lowry paintings, two major theatres, and scenic dock walks.',
    fullDescription:
      'Located at Pier 8 on the historic Manchester Ship Canal docks, The Lowry celebrates the life and "matchstick" industrial paintings of Laurence Stephen Lowry alongside touring West End productions, contemporary dance, and digital galleries across a pedestrian-friendly waterfront.',
    image: '../media/images/the-lowry.svg',
    alt: 'Illustration of The Lowry angular modern arts complex and pedestrian arch footbridge over Salford Quays',
    hours: 'Galleries: Tue–Fri 11:00 – 17:00, Sat–Sun 10:00 – 17:00',
    pricing: 'Free gallery admission (theatre performances ticketed)',
    transport: 'Metrolink: MediaCityUK or Harbour City (5-min walk)',
    tip: 'Cross the lifting footbridge at sunset for reflections of MediaCityUK and Imperial War Museum North on the water.'
  },
  {
    id: 'mackie-mayor',
    name: 'Mackie Mayor & Ancoats',
    category: 'Food',
    neighbourhood: 'Ancoats / Northern Quarter Edge',
    shortDescription:
      'A meticulously restored 1858 Grade II-listed market hall serving independent street food, wood-fired pizza, and local craft ales.',
    fullDescription:
      'Once the Smithfield meat market, Mackie Mayor now buzzes under a soaring iron-and-glass roof filled with communal oak tables and nine independent kitchens—from artisanal bakeries and tender steaks to bao, ramen, and Northern craft breweries.',
    image: '../media/images/mackie-mayor.svg',
    alt: 'Illustration of Mackie Mayor Victorian red-brick market hall with glowing arches and glass roof',
    hours: 'Tue–Sat: 09:00 – 22:00, Sun: 09:00 – 18:00 (Closed Mondays)',
    pricing: 'Free entry; dishes typically £8 – £16',
    transport: 'Metrolink: Shudehill or Piccadilly Gardens (7-min walk)',
    tip: 'Arrive before 12:15 for lunch or after 17:30 on weekdays to snag a table upstairs on the mezzanine balcony.'
  },
  {
    id: 'art-gallery',
    name: 'Manchester Art Gallery',
    category: 'Museum',
    neighbourhood: 'City Centre (Mosley Street)',
    shortDescription:
      'Celebrated civic gallery showcasing world-renowned Pre-Raphaelite paintings, historic costume collections, and contemporary design.',
    fullDescription:
      'Housed in an 1823 Greek Revival building designed by Sir Charles Barry, Manchester Art Gallery holds over 25,000 objects spanning fine art, ceramics, and fashion. Visitors can admire works by Rossetti, Millais, Turner, and Valette alongside thought-provoking modern commissions.',
    image: '../media/images/art-gallery.svg',
    alt: 'Illustration of Manchester Art Gallery Greek Revival stone portico with Ionic columns',
    hours: 'Tuesday – Sunday: 10:00 – 17:00 (Closed Mondays)',
    pricing: 'Free entry',
    transport: 'Metrolink: St Peter\'s Square or Mosley Street (2-min walk)',
    tip: 'Don\'t miss Adolphe Valette\'s atmospheric impressionist paintings of misty Edwardian Manchester streets.'
  },
  {
    id: 'castlefield-viaduct',
    name: 'Castlefield Urban Heritage Park & Viaduct',
    category: 'Landmark',
    neighbourhood: 'Castlefield',
    shortDescription:
      'A peaceful canal basin framed by Roman fort walls, towering railway arches, and the National Trust\'s elevated sky-garden viaduct.',
    fullDescription:
      'Designated the UK\'s first Urban Heritage Park, Castlefield marks both the Roman birthplace of Manchester (Mamucium) and the meeting point of the Bridgewater and Rochdale canals. Today, the 1892 Grade II-listed Castlefield Viaduct blooms overhead as a greenery-filled elevated park.',
    image: '../media/images/castlefield-viaduct.svg',
    alt: 'Illustration of Castlefield Viaduct green sky garden arches spanning over a dark-blue canal basin',
    hours: 'Park open 24/7; Viaduct Sky Garden daily 10:00 – 16:30',
    pricing: 'Free (walk-up entry or free timed booking for the Viaduct)',
    transport: 'Metrolink: Deansgate-Castlefield (2-min walk)',
    tip: 'Follow the canal towpath west past Merchants Bridge for quiet waterside pubs and narrowboat moorings.'
  }
];

const STORAGE_KEY = 'manchesterGuideFavourites';

/* ==========================================================================
   2. Favourites Persistence (localStorage) & Shared UI Helpers
   ========================================================================== */

/**
 * Safely reads saved attraction IDs from localStorage.
 * @returns {string[]} Array of attraction IDs.
 */
function getFavourites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

/**
 * Persists attraction IDs to localStorage and updates nav badge.
 * @param {string[]} ids - Array of attraction IDs.
 */
function saveFavourites(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    // Graceful fallback if storage quota or privacy mode blocks writes
  }
  updateNavBadge();
}

/**
 * Checks whether an attraction ID is currently saved.
 * @param {string} id
 * @returns {boolean}
 */
function isFavourite(id) {
  return getFavourites().includes(id);
}

/**
 * Toggles an attraction ID in localStorage and returns the new saved state.
 * @param {string} id
 * @returns {boolean} True if now saved, false if removed.
 */
function toggleFavourite(id) {
  const current = getFavourites();
  const exists = current.includes(id);
  const updated = exists ? current.filter((item) => item !== id) : [...current, id];
  saveFavourites(updated);
  return !exists;
}

/**
 * Updates the live favourites counter badge in the shared navigation bar.
 */
function updateNavBadge() {
  const badge = document.getElementById('nav-fav-count');
  if (!badge) return;
  const count = getFavourites().length;
  badge.textContent = String(count);
  badge.setAttribute('aria-label', `${count} saved attractions`);
}

let toastTimer = null;

/**
 * Displays a brief accessible toast announcement.
 * @param {string} message
 */
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;

  if (toastTimer) {
    clearTimeout(toastTimer);
  }
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2800);
}

/**
 * Finds an attraction object by its ID.
 * @param {string} id
 * @returns {object|undefined}
 */
function findAttraction(id) {
  return ATTRACTIONS.find((item) => item.id === id);
}

/**
 * Updates the label, class, and aria-pressed state of a favourite toggle button.
 * @param {HTMLButtonElement} button
 * @param {boolean} saved
 * @param {string} attractionName
 */
function syncFavButtonVisual(button, saved, attractionName) {
  if (!button) return;
  button.classList.toggle('btn--saved', saved);
  button.classList.toggle('btn--outline', !saved);
  button.setAttribute('aria-pressed', String(saved));
  button.textContent = saved ? 'Saved (Remove)' : 'Add to Favourites';
  button.setAttribute(
    'aria-label',
    saved
      ? `Remove ${attractionName} from favourites`
      : `Add ${attractionName} to favourites`
  );
}

/**
 * Keeps all favourite buttons matching a given attraction ID synchronized across DOM & modal.
 * @param {string} id
 */
function syncAllFavButtonsFor(id) {
  const attraction = findAttraction(id);
  if (!attraction) return;
  const saved = isFavourite(id);

  document.querySelectorAll(`[data-fav-id="${id}"]`).forEach((btn) => {
    syncFavButtonVisual(btn, saved, attraction.name);
  });
}

/* ==========================================================================
   3. Shared Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;
    toggleBtn.setAttribute('aria-expanded', String(nextState));
    nav.classList.toggle('is-open', nextState);
  });

  // Close mobile menu on Escape key for keyboard users
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   4. Accessible Attraction Detail Modal
   ========================================================================== */
let activeModalTrigger = null;
let activeModalAttractionId = null;

function openDetailModal(attractionId, triggerButton) {
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('detail-modal');
  const attraction = findAttraction(attractionId);
  if (!backdrop || !modal || !attraction) return;

  activeModalTrigger = triggerButton || null;
  activeModalAttractionId = attractionId;
  if (activeModalTrigger) {
    activeModalTrigger.setAttribute('aria-expanded', 'true');
  }

  // Populate modal fields cleanly via textContent / attributes
  const badge = document.getElementById('modal-category');
  const title = document.getElementById('modal-title');
  const img = document.getElementById('modal-image');
  const desc = document.getElementById('modal-description');
  const neighbourhood = document.getElementById('modal-neighbourhood');
  const hours = document.getElementById('modal-hours');
  const pricing = document.getElementById('modal-pricing');
  const transport = document.getElementById('modal-transport');
  const tip = document.getElementById('modal-tip');
  const modalFavBtn = document.getElementById('modal-fav-btn');

  if (badge) {
    badge.textContent = attraction.category;
    badge.setAttribute('data-category', attraction.category);
  }
  if (title) title.textContent = attraction.name;
  if (img) {
    img.src = attraction.image;
    img.alt = attraction.alt;
  }
  if (desc) desc.textContent = attraction.fullDescription;
  if (neighbourhood) neighbourhood.textContent = attraction.neighbourhood;
  if (hours) hours.textContent = attraction.hours;
  if (pricing) pricing.textContent = attraction.pricing;
  if (transport) transport.textContent = attraction.transport;
  if (tip) tip.textContent = attraction.tip;

  if (modalFavBtn) {
    modalFavBtn.setAttribute('data-fav-id', attraction.id);
    syncFavButtonVisual(modalFavBtn, isFavourite(attraction.id), attraction.name);
  }

  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

function closeDetailModal() {
  const backdrop = document.getElementById('modal-backdrop');
  if (!backdrop || backdrop.hidden) return;

  backdrop.hidden = true;
  document.body.style.overflow = '';

  if (activeModalTrigger) {
    activeModalTrigger.setAttribute('aria-expanded', 'false');
    activeModalTrigger.focus();
  }
  activeModalTrigger = null;
  activeModalAttractionId = null;
}

function initDetailModal(onFavouritesChange) {
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const closeFooterBtn = document.getElementById('modal-close-footer-btn');
  const modalFavBtn = document.getElementById('modal-fav-btn');

  if (!backdrop) return;

  if (closeBtn) closeBtn.addEventListener('click', closeDetailModal);
  if (closeFooterBtn) closeFooterBtn.addEventListener('click', closeDetailModal);

  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) {
      closeDetailModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !backdrop.hidden) {
      closeDetailModal();
    }
  });

  if (modalFavBtn) {
    modalFavBtn.addEventListener('click', () => {
      if (!activeModalAttractionId) return;
      const attraction = findAttraction(activeModalAttractionId);
      const nowSaved = toggleFavourite(activeModalAttractionId);
      syncAllFavButtonsFor(activeModalAttractionId);
      showToast(
        nowSaved
          ? `Saved "${attraction.name}" to My Places.`
          : `Removed "${attraction.name}" from My Places.`
      );
      if (typeof onFavouritesChange === 'function') {
        onFavouritesChange();
      }
    });
  }
}

/* ==========================================================================
   5. Card Builder Helper (Shared by Attractions & Favourites Pages)
   ========================================================================== */

/**
 * Creates a semantic <article class="card"> DOM node for an attraction.
 * @param {object} attraction
 * @param {object} options
 * @param {'toggle'|'remove'} options.favMode
 * @param {Function} [options.onRemove]
 * @returns {HTMLElement}
 */
function createAttractionCard(attraction, { favMode = 'toggle', onRemove = null } = {}) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('data-attraction-id', attraction.id);

  // Image Wrapper
  const media = document.createElement('div');
  media.className = 'card-media';
  const img = document.createElement('img');
  img.src = attraction.image;
  img.alt = attraction.alt;
  img.width = 600;
  img.height = 400;
  img.loading = 'lazy';
  media.appendChild(img);

  // Body Container
  const body = document.createElement('div');
  body.className = 'card-body';

  // Meta Row (Category Badge + Neighbourhood)
  const meta = document.createElement('div');
  meta.className = 'card-meta';

  const badge = document.createElement('span');
  badge.className = 'category-badge';
  badge.setAttribute('data-category', attraction.category);
  badge.textContent = attraction.category;

  const location = document.createElement('span');
  location.className = 'card-location';
  location.textContent = `📍 ${attraction.neighbourhood}`;

  meta.append(badge, location);

  // Title & Description
  const title = document.createElement('h2');
  title.className = 'card-title';
  title.textContent = attraction.name;

  const desc = document.createElement('p');
  desc.className = 'card-description';
  desc.textContent = attraction.shortDescription;

  // Action Buttons
  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const detailsBtn = document.createElement('button');
  detailsBtn.type = 'button';
  detailsBtn.className = 'btn btn--primary btn--sm';
  detailsBtn.textContent = 'View Details';
  detailsBtn.setAttribute('aria-haspopup', 'dialog');
  detailsBtn.setAttribute('aria-expanded', 'false');
  detailsBtn.setAttribute('aria-label', `View visitor details for ${attraction.name}`);
  detailsBtn.addEventListener('click', () => {
    openDetailModal(attraction.id, detailsBtn);
  });

  const favBtn = document.createElement('button');
  favBtn.type = 'button';

  if (favMode === 'remove') {
    favBtn.className = 'btn btn--danger btn--sm';
    favBtn.textContent = 'Remove';
    favBtn.setAttribute('aria-label', `Remove ${attraction.name} from saved places`);
    favBtn.addEventListener('click', () => {
      if (isFavourite(attraction.id)) {
        toggleFavourite(attraction.id);
      }
      showToast(`Removed "${attraction.name}" from My Places.`);
      if (typeof onRemove === 'function') {
        onRemove(attraction.id, card);
      }
    });
  } else {
    favBtn.className = 'btn btn--sm';
    favBtn.setAttribute('data-fav-id', attraction.id);
    syncFavButtonVisual(favBtn, isFavourite(attraction.id), attraction.name);
    favBtn.addEventListener('click', () => {
      const nowSaved = toggleFavourite(attraction.id);
      syncAllFavButtonsFor(attraction.id);
      showToast(
        nowSaved
          ? `Saved "${attraction.name}" to My Places.`
          : `Removed "${attraction.name}" from My Places.`
      );
    });
  }

  actions.append(detailsBtn, favBtn);
  body.append(meta, title, desc, actions);
  card.append(media, body);
  return card;
}

/* ==========================================================================
   6. Page Initialisers
   ========================================================================== */

/**
 * Home Page (pages/index.html): syncs any featured card favourite buttons.
 */
function initHomePage() {
  const favButtons = document.querySelectorAll('[data-fav-id]');
  if (!favButtons.length) return;

  favButtons.forEach((btn) => {
    const id = btn.getAttribute('data-fav-id');
    const attraction = findAttraction(id);
    if (!attraction) return;

    syncFavButtonVisual(btn, isFavourite(id), attraction.name);
    btn.addEventListener('click', () => {
      const nowSaved = toggleFavourite(id);
      syncAllFavButtonsFor(id);
      showToast(
        nowSaved
          ? `Saved "${attraction.name}" to My Places.`
          : `Removed "${attraction.name}" from My Places.`
      );
    });
  });
}

/**
 * Attractions Listing Page (pages/attractions.html):
 * Live search, category filter buttons, and modal integration.
 */
function initAttractionsPage() {
  const grid = document.getElementById('attractions-grid');
  const searchInput = document.getElementById('attraction-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const resultsCount = document.getElementById('results-count');
  const emptyState = document.getElementById('attractions-empty');
  const resetBtn = document.getElementById('reset-filters-btn');

  if (!grid) return;

  let activeCategory = 'All';
  let searchQuery = '';

  // Support optional URL query parameter, e.g. attractions.html?category=Museum
  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category');
  if (paramCategory) {
    const matchingBtn = Array.from(filterButtons).find(
      (btn) => btn.getAttribute('data-filter')?.toLowerCase() === paramCategory.toLowerCase()
    );
    if (matchingBtn) {
      activeCategory = matchingBtn.getAttribute('data-filter');
      filterButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      matchingBtn.setAttribute('aria-pressed', 'true');
    }
  }

  function renderAttractions() {
    const query = searchQuery.trim().toLowerCase();

    const filtered = ATTRACTIONS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.shortDescription.toLowerCase().includes(query) ||
        item.neighbourhood.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    grid.innerHTML = '';
    const fragment = document.createDocumentFragment();
    filtered.forEach((attraction) => {
      fragment.appendChild(createAttractionCard(attraction, { favMode: 'toggle' }));
    });
    grid.appendChild(fragment);

    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} of ${ATTRACTIONS.length} attractions`;
    }

    if (emptyState) {
      emptyState.hidden = filtered.length > 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      searchQuery = event.target.value;
      renderAttractions();
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-filter') || 'All';
      filterButtons.forEach((other) => {
        other.setAttribute('aria-pressed', String(other === btn));
      });
      renderAttractions();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeCategory = 'All';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      filterButtons.forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.getAttribute('data-filter') === 'All'));
      });
      renderAttractions();
      if (searchInput) searchInput.focus();
    });
  }

  initDetailModal();
  renderAttractions();
}

/**
 * Favourites / My Places Page (pages/favourites.html):
 * Renders saved attractions from localStorage and updates counter/empty state live.
 */
function initFavouritesPage() {
  const grid = document.getElementById('favourites-grid');
  const savedCounter = document.getElementById('saved-count');
  const emptyState = document.getElementById('favourites-empty');
  const clearAllBtn = document.getElementById('clear-favourites-btn');

  if (!grid) return;

  function renderFavourites() {
    const savedIds = getFavourites();
    const savedAttractions = savedIds
      .map((id) => findAttraction(id))
      .filter(Boolean);

    grid.innerHTML = '';

    if (savedCounter) {
      savedCounter.textContent = `Saved Places: ${savedAttractions.length}`;
    }

    if (clearAllBtn) {
      clearAllBtn.hidden = savedAttractions.length === 0;
    }

    if (emptyState) {
      emptyState.hidden = savedAttractions.length > 0;
    }

    if (savedAttractions.length === 0) return;

    const fragment = document.createDocumentFragment();
    savedAttractions.forEach((attraction) => {
      const card = createAttractionCard(attraction, {
        favMode: 'remove',
        onRemove: () => {
          renderFavourites();
        }
      });
      fragment.appendChild(card);
    });
    grid.appendChild(fragment);
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      saveFavourites([]);
      renderFavourites();
      showToast('Cleared all saved places.');
    });
  }

  initDetailModal(() => {
    renderFavourites();
  });

  renderFavourites();
}

/**
 * Contact / Enquiry Page (pages/contact.html):
 * Accessible client-side DOM validation with inline errors & confirmation banner.
 */
function initContactPage() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fullNameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const topicSelect = document.getElementById('topic');
  const visitDateInput = document.getElementById('visit-date');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('message-char-count');
  const confirmationBox = document.getElementById('form-confirmation');
  const confirmationSummary = document.getElementById('confirmation-summary');
  const newEnquiryBtn = document.getElementById('new-enquiry-btn');

  // Set minimum date helper attribute to today
  if (visitDateInput) {
    const todayIso = new Date().toISOString().split('T')[0];
    visitDateInput.setAttribute('min', todayIso);
  }

  function setFieldError(input, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (!input || !errorEl) return;
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
    } else {
      input.setAttribute('aria-invalid', 'false');
      errorEl.textContent = '';
    }
  }

  function validateName() {
    const val = fullNameInput.value.trim();
    if (!val) {
      setFieldError(fullNameInput, 'full-name-error', 'Please enter your full name.');
      return false;
    }
    if (val.length < 2) {
      setFieldError(fullNameInput, 'full-name-error', 'Name must be at least 2 characters.');
      return false;
    }
    setFieldError(fullNameInput, 'full-name-error', '');
    return true;
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!val) {
      setFieldError(emailInput, 'email-error', 'Please enter your email address.');
      return false;
    }
    if (!emailPattern.test(val)) {
      setFieldError(emailInput, 'email-error', 'Please enter a valid email address (e.g., alex@example.com).');
      return false;
    }
    setFieldError(emailInput, 'email-error', '');
    return true;
  }

  function validateTopic() {
    if (!topicSelect.value) {
      setFieldError(topicSelect, 'topic-error', 'Please select an enquiry topic.');
      return false;
    }
    setFieldError(topicSelect, 'topic-error', '');
    return true;
  }

  function validateVisitDate() {
    if (!visitDateInput || !visitDateInput.value) {
      setFieldError(visitDateInput, 'visit-date-error', '');
      return true;
    }
    const todayIso = new Date().toISOString().split('T')[0];
    if (visitDateInput.value < todayIso) {
      setFieldError(visitDateInput, 'visit-date-error', 'Planned visit date cannot be in the past.');
      return false;
    }
    setFieldError(visitDateInput, 'visit-date-error', '');
    return true;
  }

  function validateMessage() {
    const val = messageInput.value.trim();
    if (!val) {
      setFieldError(messageInput, 'message-error', 'Please enter your message or question.');
      return false;
    }
    if (val.length < 20) {
      setFieldError(
        messageInput,
        'message-error',
        `Please write at least 20 characters (${20 - val.length} more needed).`
      );
      return false;
    }
    setFieldError(messageInput, 'message-error', '');
    return true;
  }

  // Live feedback on blur / input
  fullNameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  topicSelect.addEventListener('change', validateTopic);
  if (visitDateInput) visitDateInput.addEventListener('change', validateVisitDate);

  messageInput.addEventListener('input', () => {
    if (charCount) {
      charCount.textContent = `${messageInput.value.trim().length} / 20 minimum characters`;
    }
    if (messageInput.getAttribute('aria-invalid') === 'true') {
      validateMessage();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const checks = [
      { ok: validateName(), el: fullNameInput },
      { ok: validateEmail(), el: emailInput },
      { ok: validateTopic(), el: topicSelect },
      { ok: validateVisitDate(), el: visitDateInput },
      { ok: validateMessage(), el: messageInput }
    ];

    const firstInvalid = checks.find((check) => !check.ok);
    if (firstInvalid) {
      firstInvalid.el.focus();
      return;
    }

    // Valid submission — render dynamic confirmation without page reload
    const submittedName = fullNameInput.value.trim();
    const submittedEmail = emailInput.value.trim();
    const submittedTopic = topicSelect.options[topicSelect.selectedIndex].text;
    const submittedDate = visitDateInput && visitDateInput.value ? visitDateInput.value : 'Flexible / Not specified';

    if (confirmationSummary) {
      confirmationSummary.textContent =
        `Thank you, ${submittedName}. We have logged your "${submittedTopic}" enquiry (planned visit: ${submittedDate}) and will reply to ${submittedEmail} within 2 working days.`;
    }

    form.hidden = true;
    if (confirmationBox) {
      confirmationBox.hidden = false;
      confirmationBox.focus();
    }
  });

  if (newEnquiryBtn) {
    newEnquiryBtn.addEventListener('click', () => {
      form.reset();
      if (charCount) charCount.textContent = '0 / 20 minimum characters';
      ['full-name-error', 'email-error', 'topic-error', 'visit-date-error', 'message-error'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
      });
      [fullNameInput, emailInput, topicSelect, visitDateInput, messageInput].forEach((input) => {
        if (input) input.setAttribute('aria-invalid', 'false');
      });
      if (confirmationBox) confirmationBox.hidden = true;
      form.hidden = false;
      fullNameInput.focus();
    });
  }
}

/* ==========================================================================
   7. Bootstrap Application on DOMContentLoaded
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  updateNavBadge();

  const pageType = document.body.getAttribute('data-page');
  if (pageType === 'home') {
    initHomePage();
  } else if (pageType === 'attractions') {
    initAttractionsPage();
  } else if (pageType === 'favourites') {
    initFavouritesPage();
  } else if (pageType === 'contact') {
    initContactPage();
  }
});
