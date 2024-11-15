// This changes the title of your site
import "../config/custom.js";

document.addEventListener("DOMContentLoaded", () => {
  const sitename = "Unblocked Games Hyper"; // Change this to change the name of your website.
  const subtext = "v1.0"; // Set the subtext

  // More settings in main.css

  // END CONFIG
  // DO NOT MODIFY IF YOU DO NOT KNOW WHAT YOU'RE DOING!

  const serverUrl1 = "https://ubghyper.github.io/GameList.github.io";
  const currentPageTitle = document.title;
  document.title = `${currentPageTitle} | ${sitename}`;
  let gamesData = []; 
  let gameData = []; // Declare outside for accessibility

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
    const searchInputValue = document.getElementById("searchInput").value.toLowerCase();
    const filteredGames = gamesData.filter((game) =>
      game.name.toLowerCase().includes(searchInputValue)
    );
    displayFilteredGames(filteredGames);
  }

  fetch("./config/games.json") 
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      gamesData = data;
      displayFilteredGames(data); 
      gameData = data; // Store game data for later use

      // Fetching details for the game from the URL parameter
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const gameUrl = urlParams.get("gameurl");

      if (gameUrl) {
        const gameDataFound = gameData.find(game => game.url === gameUrl);
        if (gameDataFound) {
          // Display game title and credits
          document.getElementById("gameTitle").innerText = gameDataFound.name;
          document.getElementById("gameCredits").innerText = `Developer: ${gameDataFound.credits}`;
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
  document.getElementById("title").textContent = sitename;
  document.getElementById("subtitle").textContent = subtext;
});
