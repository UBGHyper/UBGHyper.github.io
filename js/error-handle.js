export class ErrorHandler {
    static showError(message) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-notification';
        errorContainer.textContent = message;
        document.body.appendChild(errorContainer);
        
        setTimeout(() => errorContainer.remove(), 3000);
    }

    static handleStorageError(error) {
        console.error('Storage operation failed:', error);
        this.showError('Unable to complete storage operation');
    }
}
