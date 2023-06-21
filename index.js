const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config');
const PORT = 4002;

//Crear el servidor de express
const app = express();

//Ejecutar la conexión a la DB
dbConnection();

//CORS
app.use(cors());

//Lectura y parse del body
app.use(express.json());

//Agregar rutas
app.use('/api/artista', require('./routes/artista'));
app.use('/api/album', require('./routes/album'));

//Escucha de peticiones
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});