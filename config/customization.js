document.addEventListener('DOMContentLoaded', () => {
    // Common DOM elements
    const backgroundImageInput = document.getElementById('backgroundImage');
    const fontFamilySelect = document.getElementById('fontFamily');
    const themeColorPicker = document.getElementById('themeColor');
    const textColorPicker = document.getElementById('textColor');
    const navbarColorPicker = document.getElementById('navbarColor');
    const saveButton = document.getElementById('saveButton');
    const resetButton = document.getElementById('resetButton');
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    const defaultValues = {
        backgroundImage: '',
        fontFamily: 'Poppins',
        themeColor: '#ff6600',
        textColor: '#333333',
        navbarColor: '#333333'
    };

    // Load settings from local storage and apply them
    const loadSettings = () => {
        const savedSettings = JSON.parse(localStorage.getItem('ubgCustomizations'));
        
        if (savedSettings) {
            // Update inputs if they exist
            if (backgroundImageInput) backgroundImageInput.value = savedSettings.backgroundImage || '';
            if (fontFamilySelect) fontFamilySelect.value = savedSettings.fontFamily || 'Poppins';
            if (themeColorPicker) themeColorPicker.value = savedSettings.themeColor || '#ff6600';
            if (textColorPicker) textColorPicker.value = savedSettings.textColor || '#333333';
            if (navbarColorPicker) navbarColorPicker.value = savedSettings.navbarColor || '#333333';
            applyCustomizations(savedSettings);
        } else {
            applyCustomizations(defaultValues);
        }
    };

    // Apply the customization settings to the page
    const applyCustomizations = (customizations) => {
        document.documentElement.style.setProperty('--font-family', customizations.fontFamily || 'Poppins, sans-serif');
        document.documentElement.style.setProperty('--text-color', customizations.textColor || '#fff');
        document.documentElement.style.setProperty('--navbar-bg', customizations.navbarColor || '#111');

        body.style.backgroundImage = `url(${customizations.backgroundImage || ''})`;
        body.style.fontFamily = customizations.fontFamily || 'Poppins, sans-serif';
        body.style.color = customizations.textColor || '#fff';
        navbar.style.backgroundColor = customizations.navbarColor || '#111';

        document.querySelectorAll('.navbar a').forEach(link => {
            link.style.color = customizations.themeColor || '#ff8500';
        });
        document.querySelectorAll('.button-container button').forEach(button => {
            button.style.backgroundColor = customizations.themeColor || '#ff5e00';
        });
    };

    const updatePreview = () => {
        if (backgroundImageInput) {
            document.getElementById('backgroundPreview').style.backgroundImage = backgroundImageInput.value ? `url(${backgroundImageInput.value})` : '';
        }
        document.getElementById('textPreview').style.fontFamily = fontFamilySelect.value;
        document.getElementById('textPreview').style.color = textColorPicker.value;
        document.getElementById('backgroundPreview').style.backgroundColor = themeColorPicker.value;
    };

    const saveSettings = () => {
        const customizations = {
            backgroundImage: backgroundImageInput?.value || '',
            fontFamily: fontFamilySelect?.value || 'Poppins',
            themeColor: themeColorPicker?.value || '#ff6600',
            textColor: textColorPicker?.value || '#333333',
            navbarColor: navbarColorPicker?.value || '#333333'
        };
        localStorage.setItem('ubgCustomizations', JSON.stringify(customizations));
        applyCustomizations(customizations);
    };

    const resetSettings = () => {
        if (backgroundImageInput) backgroundImageInput.value = defaultValues.backgroundImage;
        if (fontFamilySelect) fontFamilySelect.value = defaultValues.fontFamily;
        if (themeColorPicker) themeColorPicker.value = defaultValues.themeColor;
        if (textColorPicker) textColorPicker.value = defaultValues.textColor;
        if (navbarColorPicker) navbarColorPicker.value = defaultValues.navbarColor;
        updatePreview();
        applyCustomizations(defaultValues);
        localStorage.removeItem('ubgCustomizations');
    };

    // Event listeners for interactive elements (if they exist)
    saveButton?.addEventListener('click', (event) => {
        event.preventDefault();
        saveSettings();
    });

    resetButton?.addEventListener('click', resetSettings);
    backgroundImageInput?.addEventListener('input', updatePreview);
    fontFamilySelect?.addEventListener('change', updatePreview);
    themeColorPicker?.addEventListener('input', updatePreview);
    textColorPicker?.addEventListener('input', updatePreview);
    navbarColorPicker?.addEventListener('input', updatePreview);

    // Load and apply settings initially
    loadSettings();
});