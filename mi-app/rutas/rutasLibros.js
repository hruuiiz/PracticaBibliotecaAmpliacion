const express = require('express');
const router = express.Router();
const ControladorLibros = require('../controladores/controladorLibros');

router.get('/', ControladorLibros.getLibros);
router.get('/:id', ControladorLibros.getLibro);
router.post('/', ControladorLibros.crearLibro);
router.put('/:id', ControladorLibros.actualizarLibro);
router.delete('/:id', ControladorLibros.eliminarLibro);

module.exports = router;