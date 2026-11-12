const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: String,
  genero: String,
  anio: Number,
  sinopsis: String,
  imagen: String,
  disponible: Boolean,
  fechaAlta: String
});

module.exports = mongoose.model('Libro', libroSchema);