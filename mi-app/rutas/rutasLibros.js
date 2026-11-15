const express = require('express');
const router = express.Router();
const ControladorLibros = require('../controladores/controladorLibros');

router.get('/', ControladorLibros.getLibros);
router.get('/:id', ControladorLibros.getLibro); //Se pone /:id en algunos porque es el id del objeto sobre el que se actua
router.post('/', ControladorLibros.crearLibro);
router.put('/:id', ControladorLibros.actualizarLibro);
router.delete('/:id', ControladorLibros.eliminarLibro);

module.exports = router;