const mongoose = require('mongoose'); //Librería y variable de la librería

const libroSchema = new mongoose.Schema({ //El esquema vive dentro de la librería
  titulo: { type: String, required: true },
  autor: String,
  genero: String,
  anio: Number,
  sinopsis: String,
  imagen: String,
  disponible: Boolean,
  fechaAlta: String
});

module.exports = mongoose.model('Libro', libroSchema); //Exporta el modelo para que los controladores lo usen