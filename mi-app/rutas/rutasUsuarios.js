const express = require('express');
const router = express.Router();
const ControladorUsuarios = require('../controladores/controladorUsuarios');

router.post('/login', ControladorUsuarios.login);
router.post('/registro', ControladorUsuarios.registro);

module.exports = router;