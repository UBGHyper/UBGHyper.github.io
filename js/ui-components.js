export class UIComponents {
    static createFileListItem(key, value) {
        const template = `
            <li class="file-item" data-key="${key}">
                <input type="checkbox" class="file-checkbox">
                <span class="file-name">${key}</span>
                <div class="button-group">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </li>
        `;
        
        return template;
    }

    static updateFileList() {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            fileList.insertAdjacentHTML('beforeend', this.createFileListItem(key));
        }
    }
}
