const Prestamo = require('../modelos/Prestamo');

async function getPrestamos(req, res) {
  try {
    const Prestamos = await Prestamo.find();
    res.status(200).json(Prestamos);
  } catch (err) {
    console.error("Error en getPrestamos:", err.message);
    res.status(500).json({"error":"Error al obtener los Prestamos"});
  }
}

async function getPrestamo(req, res) {
  try {
    const prestamo = await Prestamo.findById(req.params.id);
    if (!prestamo) return res.status(404).json({"status":"Error Prestamo no encontrado"});
    res.status(200).json(prestamo);
  } catch (err) {
    console.error("Error en getPrestamo:", err.message);
    res.status(500).json({"status":"Error al obtener el Prestamo"});
  }
}

async function crearPrestamo(req, res) {
  try {
    const newPrestamo = new Prestamo(req.body);
    await newPrestamo.save();
    res.status(201).json(newPrestamo);
  } catch (err) {
    console.error("Error en crearPrestamo:", err.message);
    res.status(500).json({"status":"Error al crear el Prestamo"});
  }
}

async function actualizarPrestamo(req, res) {
  try {
    const updatedPrestamo = await Prestamo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPrestamo) return res.status(404).json({"status":"Error Prestamo no encontrado"});
    res.status(200).json(updatedPrestamo);
  } catch (err) {
    console.error("Error en actualizarPrestamo:", err.message);
    res.status(500).json({"status":"Error al actualizar el Prestamo"});
  }
}

async function eliminarPrestamo(req, res) {
  try {
    const deletedPrestamo = await Prestamo.findByIdAndDelete(req.params.id);
    if (!deletedPrestamo) return res.status(404).json({"status":"Error Prestamo no encontrado"});
    res.status(200).json({"status":"operación realizada"});
  } catch (err) {
    console.error("Error en eliminarPrestamo:", err.message);
    res.status(500).json({"status":"Error al eliminar el Prestamo"});
  }
}

module.exports = { getPrestamos, getPrestamo, crearPrestamo, actualizarPrestamo, eliminarPrestamo };