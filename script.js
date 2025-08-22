/* Orange Arcade Scripts
Renders game cards from a simple array
Search + category filtering with live announcements
Theme toggle with localStorage persistence
Easter eggs:
Konami code -> retro theme + tiny chime
Type "pumpkin" in search -> reveal secret shelf + orange rain
*/

// ---- Data: Customize games here ----
const games = [
	// title, category, url, badge (optional)
	{ title: "Neon Runner", category: "Action", url: "#", badge: "New" },
	{ title: "Puzzle Bloom", category: "Puzzle", url: "#", badge: "Hot" },
	{ title: "Retro Dash", category: "Retro", url: "#" },
	{ title: "Tower Tactics", category: "Strategy", url: "#" },
	{ title: "Orbital Drift", category: "Racing", url: "#" },
	{ title: "Tiny Farm", category: "Sim", url: "#" },
	{ title: "Blocksmith", category: "Sandbox", url: "#" },
	{ title: "Sky Flip", category: "Arcade", url: "#" },
	{ title: "Shadow Maze", category: "Puzzle", url: "#" },
	{ title: "Zip Fighter", category: "Action", url: "#" },
	{ title: "Galaxy Tap", category: "Arcade", url: "#" },
	{ title: "Bit Quest", category: "Retro", url: "#" }
];

const hiddenGames = [
	{ title: "Pumpkin Pop", category: "Arcade", url: "#", badge: "Secret" },
	{ title: "Night Drive 86", category: "Retro", url: "#" },
	{ title: "Hex Flux", category: "Puzzle", url: "#" },
	{ title: "Zen Garden", category: "Relax", url: "#" }
];

// ---- DOM Elements ----
const grid = document.getElementById('game-grid');
const hiddenGrid = document.getElementById('hidden-game-grid');
const resultCount = document.getElementById('resultCount');
const categoriesEl = document.getElementById('categories');
const searchInput = document.getElementById('search');
const announcer = document.getElementById('announcer');
const themeToggle = document.getElementById('themeToggle');
const logoBtn = document.getElementById('logo');

// ---- State ----
let activeCategory = 'All';
let konamiIndex = 0;
const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

// ---- Utils ----
const say = (msg) => { announcer.textContent = msg; };

function createCard({ title, category, url, badge }) {
	const li = document.createElement('article');
	li.className = 'card';
	li.setAttribute('role', 'listitem');
	li.dataset.category = category;

	const link = document.createElement('a');
	link.className = 'card__link';
	link.href = url;
	link.target = '_self';
	link.rel = 'noopener';

	const thumb = document.createElement('div');
	thumb.className = 'card__thumb';
	thumb.setAttribute('aria-hidden', 'true');
	link.appendChild(thumb);

	if (badge) {
		const b = document.createElement('div');
		b.className = 'badge';
		b.textContent = badge;
		li.appendChild(b);
	}

	const body = document.createElement('div');
	body.className = 'card__body';
	const h3 = document.createElement('h3');
	h3.className = 'card__title';
	h3.textContent = title;
	const meta = document.createElement('div');
	meta.className = 'card__meta';
	// ---- FIX HERE ----
	meta.innerHTML = `<span>${category}</span><span aria-hidden="true">✦</span>`;
	body.append(h3, meta);
	link.appendChild(body);

	const actions = document.createElement('div');
	actions.className = 'card__actions';
	const play = document.createElement('button');
	play.className = 'card__btn card__btn--accent';
	play.type = 'button';
	play.textContent = 'Play';
	play.addEventListener('click', (e) => {
		e.preventDefault();
		window.location.href = url;
	});

	const details = document.createElement('button');
	details.className = 'card__btn';
	details.type = 'button';
	details.textContent = 'Details';
	details.addEventListener('click', (e) => {
		e.preventDefault();
		alert(`${title}\nCategory: ${category}`);
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
	return ['All', ...Array.from(new Set(list.map(g => g.category)))];
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
		const matchesCat = activeCategory === 'All' || g.category === activeCategory;
		const matchesText = !q || g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q);
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

// ---- Easter Egg #1: Konami Code -> Retro Theme + tiny chime ----
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
			const now = document.documentElement.getAttribute('data-theme');
			const next = now === 'retro' ? (getTheme() || 'default') : 'retro';
			document.documentElement.setAttribute('data-theme', next);
			say(next === 'retro' ? 'Retro mode activated' : 'Retro mode off');
			playChime();
		}
	} else {
		konamiIndex = 0;
	}
});

// ---- Easter Egg #2: Type "pumpkin" in search -> reveal secret shelf + orange rain ----
let secretShown = false;
function maybeUnlockSecret() {
	const v = searchInput.value.trim().toLowerCase();
	if (!secretShown && v.includes('pumpkin')) {
		secretShown = true;
		revealSecretShelf();
		orangeRain();
		say('Secret shelf unlocked!');
	}
}
searchInput.addEventListener('input', () => {
	filter();
	maybeUnlockSecret();
});

// Secret shelf reveal function
function revealSecretShelf() {
	const sect = document.getElementById('hidden-games');
	renderGrid(hiddenGames, hiddenGrid);
	sect.hidden = false;
	sect.setAttribute('aria-hidden', 'false');
	sect.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Orange rain particles (respects reduced motion)
function orangeRain() {
	if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	const layer = document.createElement('div');
	layer.className = 'orange-rain';
	const drops = Math.min(24, Math.max(12, Math.floor(window.innerWidth / 60)));
	for (let i = 0; i < drops; i++) {
		const d = document.createElement('span');
		d.className = 'orange-rain__drop';
		d.textContent = '🍊';
		const left = Math.random() * 100;
		const delay = Math.random() * 0.8;
		const duration = 2.6 + Math.random() * 1.6;
		d.style.left = `${left}vw`;
		d.style.animationDuration = `${duration}s`;
		d.style.animationDelay = `${delay}s`;
		layer.appendChild(d);
	}
	document.body.appendChild(layer);
	// Clean up after animation
	setTimeout(() => { layer.remove(); }, 5000);
}

// ---- Logo multi-click fun (extra micro-egg) ----
let logoClicks = 0;
logoBtn.addEventListener('click', () => {
	logoClicks++;
	if (logoClicks === 5) {
		logoClicks = 0;
		say('You really like that logo!');
		// Gentle highlight of search to guide discovery
		searchInput.focus();
	}
});

// ---- Init ----
function init() {
	// Theme persistence
	setTheme(getTheme());

	// Render content
	renderGrid(games, grid);
	renderCategories(games);
	filter();

	// Year in footer
	const y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear();

	// Idle: pre-render hidden games for faster reveal (without showing)
	if ('requestIdleCallback' in window) {
		requestIdleCallback(() => renderGrid(hiddenGames, hiddenGrid));
	}
}
document.addEventListener('DOMContentLoaded', init);

// script.js

fetch('games.json')
  .then(res => res.json())
  .then(games => {
    const grid = document.getElementById('game-grid');
    grid.innerHTML = ""; // Clear loading message

    games.forEach(game => {
      // Create card element
      const card = document.createElement('a');
      card.className = 'game-card';
      card.href = game.url; // Link to the game's page (adjust as needed)
      card.setAttribute('role', 'listitem');
      card.innerHTML = `
        <div class="game-card__image">
          <img src="images/${game.image}" alt="${game.name}" loading="lazy" />
          ${game.new ? '<span class="chip chip--new">New</span>' : ''}
        </div>
        <div class="game-card__body">
          <h3 class="game-card__title">${game.name}</h3>
          <p class="game-card__meta">${game.credits}</p>
          <div class="game-card__tags">
            ${game.tags.map(tag => `<span class="chip">${tag}</span>`).join(' ')}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Update result count (optional)
    document.getElementById('resultCount').textContent = games.length + " games";
  })
  .catch(() => {
    document.getElementById('game-grid').innerHTML = "<p>Couldn't load games.</p>";
    document.getElementById('resultCount').textContent = "Error loading games.";
  });