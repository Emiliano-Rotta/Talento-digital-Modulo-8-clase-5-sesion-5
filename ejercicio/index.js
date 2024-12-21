const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());

// Servir contenido estático desde "public"
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejo de archivos
app.use(fileUpload());

// Ruta para subir archivos PDF
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
    }

    const archivo = req.files.archivo;

    // Validar extensión y tamaño del archivo
    if (path.extname(archivo.name).toLowerCase() !== '.pdf') {
        return res.status(400).json({ message: 'Solo se permiten archivos PDF.' });
    }

    if (archivo.size > 5 * 1024 * 1024) {
        return res.status(400).json({ message: 'El archivo es demasiado grande. Máximo 5 MB.' });
    }

    // Crear carpeta "pdf_uploads" si no existe
    const uploadDir = path.join(__dirname, 'pdf_uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    // Guardar archivo en el servidor
    const uploadPath = path.join(uploadDir, archivo.name);
    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al guardar el archivo.', error: err });
        }

        res.status(200).json({ message: 'Archivo subido exitosamente.', filePath: `/pdf_uploads/${archivo.name}` });
    });
});

// Ruta para listar archivos PDF
app.get('/files', (req, res) => {
    const uploadDir = path.join(__dirname, 'pdf_uploads');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error al listar los archivos.' });
        }

        res.status(200).json({ files });
    });
});

// Ruta para eliminar un archivo PDF
app.delete('/delete/:fileName', (req, res) => {
    const filePath = path.join(__dirname, 'pdf_uploads', req.params.fileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Archivo no encontrado o ya eliminado.' });
        }

        res.status(200).json({ message: 'Archivo eliminado exitosamente.' });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

