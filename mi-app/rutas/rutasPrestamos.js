const express = require('express');
const router = express.Router();
const ControladorPrestamos = require('../controladores/controladorPrestamos');

router.get('/', ControladorPrestamos.getPrestamos);
router.get('/:id', ControladorPrestamos.getPrestamo);
router.post('/', ControladorPrestamos.crearPrestamo);
router.put('/:id', ControladorPrestamos.actualizarPrestamo);
router.delete('/:id', ControladorPrestamos.eliminarPrestamo);

module.exports = router;