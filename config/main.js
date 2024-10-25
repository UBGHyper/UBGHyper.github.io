// This changes the title of your site
var sitename = "UBGHyper"; // Change this to change the name of your website.
var subtext = "v1.0"; // Set the subtext

// More settings in main.css

// END CONFIG
// DO NOT MODIFY IF YOU DO NOT KNOW WHAT YOU'RE DOING!

import "/./config/custom.js";

var serverUrl1 = "https://ubghyper.github.io/GameList.github.io/";
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
    gameImage.onclick = () => showGameCredits(game); // Updated to show credits

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

function showGameCredits(game) {
  // Create a modal or a section to display the credits
  const creditsModal = document.getElementById("creditsModal");
  creditsModal.innerHTML = `
    <h2>${game.name}</h2>
    <p>Developer: ${game.credits}</p>
    <button onclick="closeCredits()">Close</button>
  `;
  creditsModal.style.display = "block"; // Show the modal
}

function closeCredits() {
  const creditsModal = document.getElementById("creditsModal");
  creditsModal.style.display = "none"; // Hide the modal
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

document.getElementById("title").innerHTML = `${sitename}`;
document.getElementById("subtitle").innerHTML = `${subtext}`;
