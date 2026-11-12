const Libro = require('../modelos/Libro');

async function getLibros(req, res) {
  try {
    const libros = await Libro.find();
    res.status(200).json(libros);
  } catch (err) {
    console.error("Error en getLibros:", err.message);
    res.status(500).json({"error":"Error al obtener los libros"});
  }
}

async function getLibro(req, res) {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) return res.status(404).json({"status":"Error libro no encontrado"});
    res.status(200).json(libro);
  } catch (err) {
    console.error("Error en getLibro:", err.message);
    res.status(500).json({"status":"Error al obtener el libro"});
  }
}

async function crearLibro(req, res) {
  try {
    const newLibro = new Libro(req.body);
    await newLibro.save();
    res.status(201).json(newLibro);
  } catch (err) {
    console.error("Error en crearLibro:", err.message);
    res.status(500).json({"status":"Error al crear el libro"});
  }
}

async function actualizarLibro(req, res) {
  try {
    const updatedLibro = await Libro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Para devolver el libro actualizado
    );
    if (!updatedLibro) return res.status(404).json({"status":"Error libro no encontrado"});
    res.status(200).json(updatedLibro);
  } catch (err) {
    console.error("Error en actualizarLibro:", err.message);
    res.status(500).json({"status":"Error al actualizar el libro"});
  }
}

async function eliminarLibro(req, res) {
  try {
    const deletedLibro = await Libro.findByIdAndDelete(req.params.id);
    if (!deletedLibro) return res.status(404).json({"status":"Error libro no encontrado"});
    res.status(200).json({"status":"operación realizada"});
  } catch (err) {
    console.error("Error en eliminarLibro:", err.message);
    res.status(500).json({"status":"Error al eliminar el libro"});
  }
}

module.exports = { getLibros, getLibro, crearLibro, actualizarLibro, eliminarLibro };