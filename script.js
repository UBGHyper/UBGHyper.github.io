/* Orange Arcade Scripts
   Loads games dynamically from games.json
   Search + category filtering with live announcements
   Theme toggle with localStorage persistence
   Easter eggs: 
      - Konami code -> retro theme + tiny chime
      - Type "pumpkin" in search -> reveal secret shelf + orange rain
*/

// ---- DOM Elements ----
const grid = document.getElementById('game-grid');
const resultCount = document.getElementById('resultCount');
const categoriesEl = document.getElementById('categories');
const searchInput = document.getElementById('search');
const announcer = document.getElementById('announcer');
const themeToggle = document.getElementById('themeToggle');
const logoBtn = document.getElementById('logo');

// ---- State ----
let games = []; // Will hold all games loaded from games.json
let activeCategory = 'All';
const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;

// ---- Utils ----
const say = (msg) => { announcer.textContent = msg; };

function createCard({ name, title, category, url, badge, image, credits, tags, new: isNew }) {
  // Support both games.json (name/image/credits/tags) and other game objects
  const gameTitle = name || title;
  const gameCategory = category || (tags && tags[0]) || 'Game';
  const gameBadge = isNew ? 'New' : (badge || '');
  const gameUrl = url || "#";
  const gameImage = image ? `images/${image}` : "";
  const gameCredits = credits || "";
  const gameTags = tags || (category ? [category] : []);

  const li = document.createElement('article');
  li.className = 'card';
  li.setAttribute('role', 'listitem');
  li.dataset.category = gameCategory;

  const link = document.createElement('a');
  link.className = 'card__link';
  link.href = gameUrl;
  link.target = '_self';
  link.rel = 'noopener';

  const thumb = document.createElement('div');
  thumb.className = 'card__thumb';
  thumb.setAttribute('aria-hidden', 'true');
  if (gameImage) {
    const img = document.createElement('img');
    img.src = gameImage;
    img.alt = gameTitle;
    img.loading = "lazy";
    thumb.appendChild(img);
  }
  link.appendChild(thumb);

  if (gameBadge) {
    const b = document.createElement('div');
    b.className = 'badge';
    b.textContent = gameBadge;
    li.appendChild(b);
  }

  const body = document.createElement('div');
  body.className = 'card__body';
  const h3 = document.createElement('h3');
  h3.className = 'card__title';
  h3.textContent = gameTitle;
  body.appendChild(h3);

  if (gameCredits) {
    const meta = document.createElement('div');
    meta.className = 'card__meta';
    meta.innerHTML = `<span>${gameCredits}</span>`;
    body.appendChild(meta);
  } else {
    const meta = document.createElement('div');
    meta.className = 'card__meta';
    meta.innerHTML = `<span>${gameCategory}</span><span aria-hidden="true">✦</span>`;
    body.appendChild(meta);
  }

  if (gameTags && gameTags.length) {
    const tagsEl = document.createElement('div');
    tagsEl.className = 'game-card__tags';
    tagsEl.innerHTML = gameTags.map(tag => `<span class="chip">${tag}</span>`).join(' ');
    body.appendChild(tagsEl);
  }
  
  link.appendChild(body);

  // Card Actions
  const actions = document.createElement('div');
  actions.className = 'card__actions';
  const play = document.createElement('button');
  play.className = 'card__btn card__btn--accent';
  play.type = 'button';
  play.textContent = 'Play';
  play.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = gameUrl;
  });
  const details = document.createElement('button');
  details.className = 'card__btn';
  details.type = 'button';
  details.textContent = 'Details';
  details.addEventListener('click', (e) => {
    e.preventDefault();
    alert(`${gameTitle}\n${gameCredits ? 'Credits: ' + gameCredits + '\n' : ""}Category: ${gameCategory}`);
  });
  actions.append(play, details);
  link.appendChild(actions);

  li.appendChild(link);
  return li;
}

function renderGrid(list, intoEl) {
  const frag = document.createDocumentFragment();
  list.forEach(item => frag.appendChild(createCard(item)));
  intoEl.replaceChildren(frag);
}

function uniqueCategories(list) {
  const listCats = list.flatMap(g => g.category ? [g.category] : (g.tags || []));
  return ['All', ...Array.from(new Set(listCats))];
}

function renderCategories(list) {
  const cats = uniqueCategories(list);
  const frag = document.createDocumentFragment();
  cats.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = 'chip'; chip.setAttribute('role', 'listitem');
    chip.setAttribute('aria-pressed', String(cat === activeCategory));
    chip.textContent = cat;
    chip.addEventListener('click', () => {
      activeCategory = cat;
      Array.from(categoriesEl.children).forEach(c => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', 'true');
      filter();
    });
    frag.appendChild(chip);
  });
  categoriesEl.replaceChildren(frag);
}

function filter() {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = games.filter(g => {
    const title = (g.name || g.title || '').toLowerCase();
    const cat = (g.category || (g.tags && g.tags.join(' ')) || '').toLowerCase();
    const matchesCat = activeCategory === 'All' || cat.includes(activeCategory.toLowerCase());
    const matchesText = !q || title.includes(q) || cat.includes(q);
    return matchesCat && matchesText;
  });
  renderGrid(filtered, grid);
  resultCount.textContent = `${filtered.length} game${filtered.length === 1 ? '' : 's'} shown`;
}

// ---- Theme Toggle ----
function getTheme() {
  return localStorage.getItem('oa-theme') || 'default';
}
function setTheme(value) {
  document.documentElement.setAttribute('data-theme', value);
  localStorage.setItem('oa-theme', value);
  themeToggle.setAttribute('aria-pressed', String(value !== 'default'));
  say(`Theme set to ${value}`);
}
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'default';
  const next = current === 'default' ? 'midnight' : 'default';
  setTheme(next);
});
// ---- Easter Egg #1: Konami Code -> Confetti + tiny chime ----

// Optional: Confetti function (simple, no dependencies)
function rainConfetti() {
  // Create confetti canvas
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9999;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const confettiCount = 80;
  const confetti = [];
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -100,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360},100%,60%)`,
      tilt: Math.random() * 10 - 10
    });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
    });
    update();
  }
  function update() {
    frame++;
    confetti.forEach(c => {
      c.y += 2 + Math.random() * 2;
      c.x += Math.sin(frame / 10 + c.d) * 1;
      if (c.y > canvas.height + 10) {
        c.y = Math.random() * -20;
        c.x = Math.random() * canvas.width;
      }
    });
  }
  let t = setInterval(draw, 1000/60);
  setTimeout(() => {
    clearInterval(t);
    canvas.remove();
  }, 2000); // Show confetti for 2 seconds
}

// Optional: Chime sound
function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.18);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.26);
  } catch {}
}

window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key === konamiSequence[konamiIndex]) {
    konamiIndex += 1;
    if (konamiIndex === konamiSequence.length) {
      konamiIndex = 0;
      rainConfetti();
      say('Konami!');
      playChime();
    }
  } else {
    konamiIndex = 0;
  }
});


// ---- Init ----
function init() {
  // Theme persistence
  setTheme(getTheme());

  // Year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Load games.json instead of static array
  fetch('games.json')
    .then(res => res.json())
    .then(json => {
      games = json; // assign to state!
      renderGrid(games, grid);
      renderCategories(games);
      filter();
      resultCount.textContent = `${games.length} game${games.length === 1 ? '' : 's'} shown`;
    })
    .catch(() => {
      grid.innerHTML = "<p>Couldn't load games.</p>";
      resultCount.textContent = "Error loading games.";
    });
}

document.addEventListener('DOMContentLoaded', init);