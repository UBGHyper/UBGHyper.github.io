// This changes the title of your site

var sitename = "v1.0"; // Change this to change the name of your website.
var subtext = "v1.0"; // set the subtext

// more settings in main.css
        const toggleSwitch = document.getElementById("toggle-switch");
        const favicon = document.querySelector("link[rel='icon']");
        const defaultFavicon = "content/favicons/tab.png";
        const toggledFavicon = "content/favicons/classroom.png";
        const defaultTitle = "UBGHyper - Home";
        const toggledTitle = "Classroom";

        toggleSwitch.addEventListener("change", () => {
            if (toggleSwitch.checked) {
                favicon.href = toggledFavicon;
                document.title = toggledTitle;
            } else {
                favicon.href = defaultFavicon;
                document.title = defaultTitle;
            }
        });

        document.getElementById('themeSelect').addEventListener('change', function() {
            const theme = this.value;
            document.body.className = theme;
            document.querySelector('.footer').className = `footer ${theme}`;
            document.querySelector('.mode-text').className = `mode-text ${theme}`;
        });


// END CONFIG
// DO NOT MODIFY IF YOU DO NOT KNOW WHAT YOUR DOING!

import "/config/custom.js";

var serverUrl1 = "https://ubghyper.github.io/GameList.github.io";
var currentPageTitle = document.title;
document.title = `${currentPageTitle} | ${sitename}`;
let gamesData = []; 

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
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


function handleSearchInput() {
  const searchInputValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}


fetch("./config/games.json") 
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data); 
  })
  .catch((error) => console.error("Error fetching games:", error));


document
  .getElementById("searchInput")
  .addEventListener("input", handleSearchInput);

const subtitleElement = document.getElementById("subtitle");
if (subtitleElement) {
  subtitleElement.innerHTML = `${subtext}`;
} else {
  console.error("Element with id 'subtitle' not found.");
}

document.getElementById("subtitle").innerHTML = `${subtext}`
