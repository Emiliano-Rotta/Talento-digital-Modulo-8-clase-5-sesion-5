document.getElementById('deleteFile').addEventListener('click', ()=>{
    const fileName = document.getElementById('fileName').value
    if(!fileName){
        alert('Por favor, ingrese el nombre del archivo a eliminar')
    }
    fetch(`/delete/${fileName}`,{
        method: 'DELETE'
    })
    .then(response =>{
        if(response.ok){
            return response.json()
        }
        throw new Error('Error al eliminar el archivo')
    })
    .then(data=>{
        alert(data.message);
        document.getElementById('fileName').value = '' //para limpiar el campo
    })
    .catch(error => {
        alert(error.message)
    })

})



document.getElementById('listFiles').addEventListener('click', ()=>{
    fetch('/files')
    .then(res => res.json())
    .then(data => {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = ''
        data.files.forEach(file => {
            const li = document.createElement('li');
            li.textContent = file;
            fileList.appendChild(li);
        });
    })
    .catch(error => {
        alert(error.message)
    })
})