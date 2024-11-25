export class SecurityMiddleware {
    static validateFileUpload(file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['text/plain', 'application/json'];
        
        if (file.size > maxSize) {
            throw new Error('File exceeds maximum size of 5MB');
        }
        
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Invalid file type');
        }
        
        return true;
    }

    static sanitizeInput(input) {
        return DOMPurify.sanitize(input);
    }
}
