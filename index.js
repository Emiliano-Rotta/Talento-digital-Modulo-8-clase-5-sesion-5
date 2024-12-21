const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

// Habilitar CORS para todas las solicitudes
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')))

app.use(fileupload())

app.post('/upload', (req, res) => {
    // Validar si se envió un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
    }

    const archivo = req.files.archivo;
    
    if(archivo.size > 2 * 1024 * 1024){
        return res.status(400).json({message: 'El archivo es demasiado grande. Máximo 2 MB.'})
    }


    // Crear carpeta 'uploads' si no existe
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    // Definir ruta para guardar el archivo
    const uploadPath = path.join(uploadDir, archivo.name);

    // Mover el archivo al servidor
    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al guardar el archivo.', error: err });
        }

        res.status(200).json({
            message: 'Archivo subido exitosamente.',
            filePath: `/uploads/${archivo.name}`,
        });
    });
});

app.delete('/delete/:fileName', (req, res) =>{

    const filePath = path.join(__dirname, 'uploads', req.params.fileName);

    fs.unlink(filePath, (err) =>{
        if(err){
            return res.status(404).json({message: "Archivo no encontrado o ya eliminado anteriormente"})
        }
        res.status(200).json({message: "Archivo eliminado correctamente"})
    })
})

app.get('/files', (req, res) =>{
    const uploadDir = path.join(__dirname, 'uploads')
    fs.readdir(uploadDir, (err, files)=>{
        if(err){
            return res.status(500).json({ message: 'Error al listar los archivos.' });
        }
        res.status(200).json({ files })
    })
})

app.listen(PORT, ()=>{
    console.log(`servidor levantado en el puerto ${PORT}`)
})



//nuevo tema cors

// ¿Qué es CORS?
// CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad que los navegadores implementan para controlar cómo se pueden compartir recursos entre diferentes orígenes. Un "origen" se define por el esquema (HTTP/HTTPS), dominio y puerto. Si tu aplicación intenta acceder a recursos desde un origen diferente (por ejemplo, un servidor de API externo), el navegador verifica si está permitido mediante CORS.


//Si tu frontend está en http://localhost:3000 y tu backend en http://localhost:4000, necesitas habilitar CORS para que el frontend pueda consumir la API del backend.

// npm i cors