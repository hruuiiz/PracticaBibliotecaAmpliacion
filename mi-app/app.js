const express = require('express'); //Cargan las dos librerías
const mongoose = require('mongoose');
const app = express(); //Crea la app
const rutasLibros = require('./rutas/rutasLibros');
const rutasPrestamos = require('./rutas/rutasPrestamos');
const rutasUsuarios = require('./rutas/rutasUsuarios');
const cors = require('cors'); //Permite que se puedan hacer peticiones al servidor

app.use(cors({
  origin: 'http://localhost:4200' //Permite que el servidor responda las solicitudes del puerto en el que está Angular
}));

app.use(express.json()); //Convierte las peticiones JSON a un objeto JS              

mongoose.connect('mongodb://root:example@localhost:27017/2daw?authSource=admin') //Conexión a Mongo, idnicando usuario, contrasña, servidor u BBDD
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar MongoDB', err));

app.use('/libros', rutasLibros); //Las peticiones de cada modelo se atienden en sus rutas
app.use('/prestamos', rutasPrestamos);
app.use('/usuarios', rutasUsuarios);     

app.use((req, res) => {                        
  res.status(404).send('Ruta no encontrada'); //Si ninguna ruta coincide responde 404
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));