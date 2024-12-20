// Consignas para el ejercicio:
// Contexto:
//implementar una aplicación en Node.js con Express que permita a los usuarios gestionar archivos PDF. 
// La aplicación debe incluir las siguientes funcionalidades:

// Requisitos funcionales:

// Subir un archivo PDF:
// Solo se deben permitir archivos con extensión .pdf.
// El tamaño máximo permitido es de 5 MB.
// Los archivos subidos deben almacenarse en una carpeta llamada pdf_uploads dentro del proyecto.

// Listar los archivos subidos:
// Mostrar una lista de los nombres de los archivos PDF disponibles en el servidor.

// Eliminar un archivo PDF:
// Permitir que el usuario elimine cualquier archivo PDF subido, seleccionándolo de la lista.

// Front-end:
// Crear una interfaz en HTML que permita subir un archivo PDF y mostrar una lista de archivos subidos con un botón para eliminar cada archivo.

// Utilizar un archivo separado en public/assets/js/script.js para manejar las solicitudes al servidor mediante fetch.

// Requisitos técnicos:
// Estructura del proyecto:
// proyecto/
// ├── index.js
// ├── public/
// │   ├── index.html
// │   └── assets/
// │       └── js/
// │           └── script.js


// Configurar Express para servir el contenido estático de la carpeta public.
// Utilizar express-fileupload para manejar las subidas de archivos.
// Verificar que los archivos subidos tengan extensión .pdf y no superen el tamaño permitido.
// Implementar las siguientes rutas:
// POST /upload: Para subir archivos.
// GET /files: Para listar los archivos disponibles.
// DELETE /delete/:fileName: Para eliminar un archivo por su nombre.
