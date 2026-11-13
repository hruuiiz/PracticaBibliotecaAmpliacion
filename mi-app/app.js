const express = require('express');
const mongoose = require('mongoose');
const app = express();
const rutasLibros = require('./rutas/rutasLibros');
const rutasPrestamos = require('./rutas/rutasPrestamos');
const rutasUsuarios = require('./rutas/rutasUsuarios');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());                      

mongoose.connect('mongodb://root:example@localhost:27017/2daw?authSource=admin')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar MongoDB', err));

app.use('/libros', rutasLibros);          
app.use('/prestamos', rutasPrestamos);
app.use('/usuarios', rutasUsuarios);     

app.use((req, res) => {                        
  res.status(404).send('Ruta no encontrada');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));