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




    // Catching unhandled errors
    window.onerror = function(message, source, lineno, colno, error) {
        logError(`Error occurred: ${message} at ${source}:${lineno}:${colno}`);
        return true; // Prevent the default browser error handling (optional)
    };

    // Capture and log console errors
    const originalConsoleError = console.error;
    console.error = function (...args) {
        // Call the original console.error
        originalConsoleError.apply(console, args);

        // Capture the error message and store it in localStorage
        const errorMessage = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
        logError(errorMessage);
    };

    // Function to log errors into localStorage
    function logError(error) {
        let errors = JSON.parse(localStorage.getItem('console-errors') || '[]');
        
        // Add the new error to the list
        errors.push(error);
        
        // Save the errors back to localStorage (keeping only the latest 100 errors)
        if (errors.length > 100) errors.shift(); // Limit the number of errors to 100
        localStorage.setItem('console-errors', JSON.stringify(errors));
    }


    const express = require('express');
const app = express();
const port = 3000;

// Store active users
let activeUsers = 0;

// Middleware to track active users on each page load
app.use((req, res, next) => {
    activeUsers++; // Increment active user count
    res.on('finish', () => {
        activeUsers--; // Decrement when the user leaves the page
    });
    next();
});

// Endpoint to get the current active user count
app.get('/api/current-user-count', (req, res) => {
    res.json({ count: activeUsers });
});

// Serve your static files (the front-end of your website)
app.use(express.static('public')); // Assuming your HTML, JS, and other assets are in 'public'

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
