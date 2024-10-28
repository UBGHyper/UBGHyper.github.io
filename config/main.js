document.addEventListener("DOMContentLoaded", () => {
  // This changes the title of your site
  var sitename = "UBGHyper"; 
  var subtext = "v1.0"; 
// more settings in main.css



  
// END CONFIG
// DO NOT MODIFY IF YOU DO NOT KNOW WHAT YOUR DOING!
import "../config/custom.js";

var serverUrl1 = "https://ubghyper.github.io/gameslist.github.io"
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

      const gameName = document.createElement("p");
      gameName.textContent = game.name;

      gameDiv.appendChild(gameImage);
      gameDiv.appendChild(gameName);
      gamesContainer.appendChild(gameDiv);
    });
  }

  function handleSearchInput() {
    const searchInputValue = document.getElementById("searchInput").value.toLowerCase();
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


      // Fetching details for the game from the URL parameter
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const gameUrl = urlParams.get("gameurl");

      if (gameUrl) {
        const gameData = data.find(game => game.url === gameUrl);
        if (gameData) {
          // Display game title and credits
          document.getElementById("gameTitle").innerText = gameData.name;
          document.getElementById("gameCredits").innerText = `Developer: ${gameData.credits}`;
          // Update the iframe source
          document.getElementById("gameFrame").src = `${serverUrl1}/${gameUrl}`;
        } else {
          document.getElementById("gameTitle").innerText = "Game Not Found";
          document.getElementById("gameCredits").innerText = "Developer: Unknown";
        }
      }
    })
    .catch((error) => console.error("Error fetching games:", error));

  document.getElementById("searchInput").addEventListener("input", handleSearchInput);
  document.getElementById("title").innerHTML = `${sitename}`;

  document.getElementById("subtitle").innerHTML = `${subtext}`;
