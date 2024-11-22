export class StorageManager {
    static async saveFile(key, value) {
        try {
            // Input validation
            if (!key || !value) throw new Error('Invalid input');
            if (value.length > 5242880) throw new Error('File too large'); // 5MB limit
            
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    static getCookie(name) {
        try {
            const value = document.cookie
                .split('; ')
                .find(row => row.startsWith(name + '='))
                ?.split('=')[1];
            return value || null;
        } catch (error) {
            console.error('Cookie error:', error);
            return null;
        }
    }
    
    // Add other storage-related methods
}
