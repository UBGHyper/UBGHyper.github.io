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

        .footer h1:hover::after {
            content: "You found me!";
            position: absolute;
            background-color: #333;
            color: #fff;
            padding: 5px;
            border-radius: 5px;
            font-size: 12px;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
        }

        .game-square:hover {
            animation: rotate 2s linear infinite;
        }

        @keyframes rotate {
            0% {
                transform: rotate(0deg);
                background-color: orange;
            }
            50% {
                transform: rotate(180deg);
                background-color: blue;
            }
            100% {
                transform: rotate(360deg);
                background-color: orange;
            }
        }

        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
            color: #333;
            transition: background-color 0.5s, color 0.5s;
        }

        body.light-mode {
            background-image: url('content/backrounds/backroundlight.png');
            color: black;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        body.dark-mode {
            background-image: url('content/backrounds/backround.png');
            color: black;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        body.blue-mode {
            background-image: url('content/backrounds/backroundblue.png');
            color: black;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        body::-webkit-scrollbar {
            width: 12px;
        }

        body::-webkit-scrollbar-track {
            background: black;
        }

        body.light-mode::-webkit-scrollbar-track {
            background: #ccc;
        }

        body.blue-mode::-webkit-scrollbar-track {
            background: #87cefa;
        }

        body::-webkit-scrollbar-thumb {
            background-color: black;
            border-radius: 20px;
            border: 3px solid orange;
        }

        .center {
            text-align: center;
            margin: 20px 0;
        }

        .center h1 {
            margin: 10px 0;
            font-family: 'Apple-font', sans-serif;
        }

        body.light-mode .center h1 {
            color: black;
        }

        #searchInput {
            padding: 10px;
            width: 80%;
            max-width: 400px;
            border: 2px solid orange;
            border-radius: 5px;
            font-size: 16px;
        }

        #gamesContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 20px;
        }

        .footer {
            text-align: center;
            padding: 20px;
            background-color: #333;
            color: white;
        }

        .footer.light-mode {
            background-color: #ccc;
            color: black;
        }

        .footer.dark-mode {
            background-color: #333;
            color: white;
        }

        .footer.blue-mode {
            background-color: #87cefa;
            color: #003366;
        }

        .footer h1 {
            margin: 5px 0;
            font-family: 'Apple-font', sans-serif;
        }

        .game-container {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }

        .game-square {
            width: 100px;
            height: 100px;
            background-color: orange;
            margin: 10px;
            border-radius: 10px;
        }

        .switch-container {
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            padding: 10px 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border: 2px solid orange;
        }

        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
            margin-right: 10px;
        }

        .toggle-switch input[type="checkbox"] {
            display: none;
        }

        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 34px;
        }

        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: orange;
            transition: .4s;
            border-radius: 50%;
        }

        .toggle-switch input[type="checkbox"]:checked + label .toggle-slider {
            background-color: #333;
        }

        .toggle-switch input[type="checkbox"]:checked + label .toggle-slider:before {
            transform: translateX(26px);
        }

        .theme-select {
            font-size: 16px;
            padding: 5px 10px;
            border: 2px solid orange;
            border-radius: 5px;
            background-color: white;
            color: black;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;
        }

        body.light-mode .theme-select {
            background-color: white;
            color: black;
        }

        body.dark-mode .theme-select {
            background-color: black;
            color: white;
        }

        body.blue-mode .theme-select {
            background-color: #87cefa;
            color: #003366;
        }

        .mode-text {
            font-family: 'Apple-font', sans-serif;
            color: #333;
        }

        .mode-text.light-mode {
            color: black;
        }

        .mode-text.dark-mode {
            color: white;
        }

        .mode-text.blue-mode {
            color: #003366;
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
