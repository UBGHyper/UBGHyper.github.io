import { StorageManager } from './storage-manager.js';

class UIManager {
    constructor() {
        this.selectedFiles = new Set();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Event delegation for file list
        document.getElementById('fileList').addEventListener('click', (e) => {
            if (e.target.matches('button.edit-btn')) {
                this.handleEditButton(e);
            }
        });

        // Other event listeners using delegation
    }

    // UI handling methods
}

export const uiManager = new UIManager();
