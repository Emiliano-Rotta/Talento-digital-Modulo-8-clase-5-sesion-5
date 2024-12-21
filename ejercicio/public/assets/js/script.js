const uploadForm = document.getElementById('uploadForm');
const fileList = document.getElementById('fileList');

// Manejar subida de archivos
uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('archivo', fileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        alert(result.message);
        loadFiles();
    } catch (error) {
        console.error('Error al subir archivo:', error);
    }
});

// Cargar lista de archivos
async function loadFiles() {
    try {
        const response = await fetch('/files');
        const result = await response.json();

        fileList.innerHTML = '';
        result.files.forEach((file) => {
            const li = document.createElement('li');
            li.textContent = file;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => deleteFile(file));

            li.appendChild(deleteButton);
            fileList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar archivos:', error);
    }
}

// Eliminar archivo
async function deleteFile(fileName) {
    try {
        const response = await fetch(`/delete/${fileName}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        alert(result.message);
        loadFiles();
    } catch (error) {
        console.error('Error al eliminar archivo:', error);
    }
}

// Cargar archivos al inicio
loadFiles();

