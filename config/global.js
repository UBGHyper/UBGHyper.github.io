document.addEventListener('DOMContentLoaded', () => {
    const backgroundImageInput = document.getElementById('backgroundImage');
    const fontFamilySelect = document.getElementById('fontFamily');
    const themeColorPicker = document.getElementById('themeColor');
    const textColorPicker = document.getElementById('textColor');
    const navbarColorPicker = document.getElementById('navbarColor');
    const backgroundPreview = document.getElementById('backgroundPreview');
    const textPreview = document.getElementById('textPreview');
    const saveButton = document.getElementById('saveButton');
    const resetButton = document.getElementById('resetButton');
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    // Default values to reset to
    const defaultValues = {
        backgroundImage: '',
        fontFamily: 'Poppins',
        themeColor: '#ff6600',
        textColor: '#333333',
        navbarColor: '#333333'
    };

    // Function to update preview elements live
    const updatePreview = () => {
        // Update the background preview live
        if (backgroundImageInput.value) {
            backgroundPreview.style.backgroundImage = `url(${backgroundImageInput.value})`;
        } else {
            backgroundPreview.style.backgroundImage = ''; // Reset if no URL
        }

        // Update the font family preview live
        const fontFamily = fontFamilySelect.value;
        textPreview.style.fontFamily = fontFamily;

        // Update text preview color live
        textPreview.style.color = textColorPicker.value;

        // Update background color for preview
        backgroundPreview.style.backgroundColor = themeColorPicker.value;
    };

    // Function to apply changes to the actual page
    const applyCustomizations = () => {
        // Apply background image to actual page
        if (backgroundImageInput.value) {
            document.documentElement.style.setProperty('--background-image', `url(${backgroundImageInput.value})`);
        } else {
            document.documentElement.style.setProperty('--background-image', ''); // Reset the background image
        }

        // Apply font family to actual page
        const fontFamily = fontFamilySelect.value;
        document.documentElement.style.setProperty('--font-family', fontFamily);
        body.style.fontFamily = fontFamily;

        // Apply theme color to actual page
        document.documentElement.style.setProperty('--link-color', themeColorPicker.value);
        document.documentElement.style.setProperty('--button-bg', themeColorPicker.value);
        document.querySelectorAll('.navbar a').forEach(link => {
            link.style.color = themeColorPicker.value;
        });
        document.querySelectorAll('.button-container button').forEach(button => {
            button.style.backgroundColor = themeColorPicker.value;
        });

        // Apply text color to actual page
        document.documentElement.style.setProperty('--text-color', textColorPicker.value);
        body.style.color = textColorPicker.value;

        // Apply navbar color to actual page
        document.documentElement.style.setProperty('--navbar-bg', navbarColorPicker.value);
        navbar.style.backgroundColor = navbarColorPicker.value;
    };

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        applyCustomizations();  // Apply customizations to the real page
    });

    resetButton.addEventListener('click', () => {
        // Reset both preview and actual page to default values
        backgroundImageInput.value = defaultValues.backgroundImage;
        fontFamilySelect.value = defaultValues.fontFamily;
        themeColorPicker.value = defaultValues.themeColor;
        textColorPicker.value = defaultValues.textColor;
        navbarColorPicker.value = defaultValues.navbarColor;

        // Reset preview
        updatePreview();

        // Reset actual page (applies to the live website)
        applyCustomizations();

        // Reset the background image CSS variable (this is key)
        document.documentElement.style.setProperty('--background-image', '');  // Clear the background image CSS variable
    });

    // Listen for changes to inputs to update preview live
    backgroundImageInput.addEventListener('input', updatePreview);
    fontFamilySelect.addEventListener('change', updatePreview);
    themeColorPicker.addEventListener('input', updatePreview);
    textColorPicker.addEventListener('input', updatePreview);
    navbarColorPicker.addEventListener('input', updatePreview);

    // Event listeners for preset themes
    const themeButtons = document.querySelectorAll('.theme-button');
    themeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const theme = event.target.getAttribute('data-theme');
            switch (theme) {
                case 'calmvapor':
                    backgroundImageInput.value = '../assets/background/calm-vaporwave.png';
                    fontFamilySelect.value = 'Poppins';
                    themeColorPicker.value = '#f6b3f8';
                    textColorPicker.value = '#4a4a4a';
                    navbarColorPicker.value = '#e3a6e2';
                    break;
                case 'redvapor':
                    backgroundImageInput.value = '../assets/background/red-vaporwave.png';
                    fontFamilySelect.value = 'Arial';
                    themeColorPicker.value = '#ff0000';
                    textColorPicker.value = '#ffffff';
                    navbarColorPicker.value = '#570000';
                    break;
                case 'bluevapor':
                    backgroundImageInput.value = '../assets/background/vaporwave-blue.png';
                    fontFamilySelect.value = 'Verdana';
                    themeColorPicker.value = '#003468';
                    textColorPicker.value = '#ffffff';
                    navbarColorPicker.value = '#003468';
                    break;
                case 'calm':
                    backgroundImageInput.value = '../assets/background/calm.png';
                    fontFamilySelect.value = 'Georgia';
                    themeColorPicker.value = '#91caff';
                    textColorPicker.value = '#ffffff';
                    navbarColorPicker.value = '#004d66';
                    break;
                case 'collab':
                    backgroundImageInput.value = '../assets/background/collab.png';
                    fontFamilySelect.value = 'Times New Roman';
                    themeColorPicker.value = '#007cf8';
                    textColorPicker.value = '#ffffff';
                    navbarColorPicker.value = '#003366';
                    break;
                default:
                    break;
            }
            updatePreview(); // Update the preview immediately when a preset theme is selected
        });
    });
});
