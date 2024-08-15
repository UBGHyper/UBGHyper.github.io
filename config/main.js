// Settings
const sitename = "UBG Hyper"; // Change this to change the name of your website.
const subtext = "v1.0"; // Set the subtext

// More settings in main.css

// Get elements
const toggleSwitch = document.getElementById("toggle-switch");
const favicon = document.querySelector("link[rel='icon']");
const themeSelect = document.getElementById('themeSelect');
const searchInput = document.getElementById("searchInput");
const gamesContainer = document.getElementById("gamesContainer");
const subtitleElement = document.getElementById("subtitle");

// Favicon settings
const defaultFavicon = "content/favicons/tab.png";
const toggledFavicon = "content/favicons/classroom.png";

// Title settings
const defaultTitle = "UBGHyper - Home";
const toggledTitle = "Classroom";

// Event listener for toggle switch
if (toggleSwitch) {
  toggleSwitch.addEventListener("change", () => {
    if (toggleSwitch.checked) {
      favicon.href = toggledFavicon;
      document.title = toggledTitle;
    } else {
      favicon.href = defaultFavicon;
      document.title = defaultTitle;
    }
  });
}

// Event listener for theme select
if (themeSelect) {
  themeSelect.addEventListener('change', function() {
    const theme = this.value;
    document.body.className = theme;
    document.querySelector('.footer').className = `footer ${theme}`;
    document.querySelector('.mode-text').className = `mode-text ${theme}`;
  });
}

// Import custom configurations
import "/config/custom.js";

// Server URL and games data
const serverUrl1 = "https://ubghyper.github.io/GameList.github.io";
let gamesData = []; 

// Display filtered games
function displayFilteredGames(filteredGames) {
  if (!gamesContainer) {
    console.error("Element with id 'gamesContainer' not found.");
    return;
  }

  gamesContainer.innerHTML = ""; 

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;
    gameImage.alt = game.name;
    gameImage.onclick = () => {
      window.location.href = `play.html?gameurl=${game.url}/`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

// Handle search input
function handleSearchInput() {
  if (!gamesData) return;
  const searchInputValue = searchInput.value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}

// Fetch and display games data
fetch("./config/games.json") 
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data); 
  })
  .catch((error) => console.error("Error fetching games:", error));

// Attach event listener to search input
if (searchInput) {
  searchInput.addEventListener("input", handleSearchInput);
}

// Update subtitle
if (subtitleElement) {
  subtitleElement.innerHTML = subtext;
} else {
  console.error("Element with id 'subtitle' not found.");
}

// Set document title
document.title = sitename;
