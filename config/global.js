// Apply saved custom settings on page load
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve saved settings from localStorage
    const savedSettings = JSON.parse(localStorage.getItem('customSettings')) || {};

    // Apply saved background image
    if (savedSettings.backgroundImage) {
        document.body.style.backgroundImage = `url(${savedSettings.backgroundImage})`;
    }

    // Apply saved font family
    if (savedSettings.fontFamily) {
        document.body.style.fontFamily = savedSettings.fontFamily;
    }

    // Apply saved theme color to buttons
    if (savedSettings.themeColor) {
        document.documentElement.style.setProperty('--button-bg', savedSettings.themeColor);
    }

    // Apply dark mode settings
    if (savedSettings.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
