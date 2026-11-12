const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
  idLibro: { type: String, required: true },
  idUsuario: { type: String, required: true },
  fechaPrestamo: String,
  fechaDevolucion: String,
  ampliado: Boolean,
  devuelto: Boolean
});

module.exports = mongoose.model('Prestamo', prestamoSchema);