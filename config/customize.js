document.addEventListener('DOMContentLoaded', () => {
    // Define DOM elements
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const backgroundImageInput = document.getElementById('backgroundImage');
    const fontFamilySelect = document.getElementById('fontFamily');
    const themeColorPicker = document.getElementById('themeColor');
    const textColorPicker = document.getElementById('textColor');
    const navbarColorPicker = document.getElementById('navbarColor');
    const saveButton = document.getElementById('saveButton');
    const resetButton = document.getElementById('resetButton');
    const themeToggle = document.querySelector('.toggle');

    // Define default customization values
    const defaultValues = {
        backgroundImage: '',
        fontFamily: 'Poppins',
        themeColor: '#ff6600',
        textColor: '#333333',
        navbarColor: '#333333',
        theme: 'light'  // Default to light mode
    };

    // Load customizations from localStorage
    const loadCustomizations = () => {
        const savedCustomizations = JSON.parse(localStorage.getItem('ubgCustomizations')) || defaultValues;

        // Apply saved customizations
        document.documentElement.style.setProperty('--background-image', savedCustomizations.backgroundImage);
        document.documentElement.style.setProperty('--font-family', savedCustomizations.fontFamily);
        document.documentElement.style.setProperty('--link-color', savedCustomizations.themeColor);
        document.documentElement.style.setProperty('--button-bg', savedCustomizations.themeColor);
        document.documentElement.style.setProperty('--text-color', savedCustomizations.textColor);
        document.documentElement.style.setProperty('--navbar-bg', savedCustomizations.navbarColor);

        // Apply the theme (light/dark mode)
        if (savedCustomizations.theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }

        // Update form elements with saved values
        backgroundImageInput.value = savedCustomizations.backgroundImage;
        fontFamilySelect.value = savedCustomizations.fontFamily;
        themeColorPicker.value = savedCustomizations.themeColor;
        textColorPicker.value = savedCustomizations.textColor;
        navbarColorPicker.value = savedCustomizations.navbarColor;

        // Update toggle state for light/dark mode
        if (savedCustomizations.theme === 'dark') {
            themeToggle.classList.add('active');
        } else {
            themeToggle.classList.remove('active');
        }
    };

    // Apply the current customizations to the page
    const applyCustomizations = () => {
        const customizations = {
            backgroundImage: backgroundImageInput.value,
            fontFamily: fontFamilySelect.value,
            themeColor: themeColorPicker.value,
            textColor: textColorPicker.value,
            navbarColor: navbarColorPicker.value,
            theme: body.classList.contains('dark-mode') ? 'dark' : 'light'  // Save current theme mode
        };

        // Save customizations to localStorage
        localStorage.setItem('ubgCustomizations', JSON.stringify(customizations));

        // Apply the customizations to the page
        document.documentElement.style.setProperty('--background-image', customizations.backgroundImage);
        document.documentElement.style.setProperty('--font-family', customizations.fontFamily);
        document.documentElement.style.setProperty('--link-color', customizations.themeColor);
        document.documentElement.style.setProperty('--button-bg', customizations.themeColor);
        document.documentElement.style.setProperty('--text-color', customizations.textColor);
        document.documentElement.style.setProperty('--navbar-bg', customizations.navbarColor);

        // Apply the theme (light/dark mode)
        if (customizations.theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    // Reset customizations to default
    const resetCustomizations = () => {
        localStorage.removeItem('ubgCustomizations');  // Clear localStorage
        loadCustomizations();  // Re-load defaults
    };

    // Handle theme toggle (light/dark mode)
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('ubgCustomizations', JSON.stringify({
                ...JSON.parse(localStorage.getItem('ubgCustomizations') || '{}'),
                theme: 'dark'
            }));
        } else {
            localStorage.setItem('ubgCustomizations', JSON.stringify({
                ...JSON.parse(localStorage.getItem('ubgCustomizations') || '{}'),
                theme: 'light'
            }));
        }
    });

    // Listen for input changes and update preview live
    backgroundImageInput.addEventListener('input', () => {
        document.documentElement.style.setProperty('--background-image', backgroundImageInput.value);
    });
    fontFamilySelect.addEventListener('change', () => {
        document.documentElement.style.setProperty('--font-family', fontFamilySelect.value);
    });
    themeColorPicker.addEventListener('input', () => {
        document.documentElement.style.setProperty('--link-color', themeColorPicker.value);
        document.documentElement.style.setProperty('--button-bg', themeColorPicker.value);
    });
    textColorPicker.addEventListener('input', () => {
        document.documentElement.style.setProperty('--text-color', textColorPicker.value);
    });
    navbarColorPicker.addEventListener('input', () => {
        document.documentElement.style.setProperty('--navbar-bg', navbarColorPicker.value);
    });

    // Save button event listener
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        applyCustomizations();  // Apply customizations to the real page
    });

    // Reset button event listener
    resetButton.addEventListener('click', (e) => {
        e.preventDefault();
        resetCustomizations();
    });

    // Initial load of customizations
    loadCustomizations();
});
