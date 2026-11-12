const Usuario = require('../modelos/Usuario');

async function getUsuarios(req, res) {
  try {
    const Usuarios = await Usuario.find();
    res.status(200).json(Usuarios);
  } catch (err) {
    console.error("Error en getUsuarios:", err.message);
    res.status(500).json({"error":"Error al obtener los Usuarios"});
  }
}

async function getUsuario(req, res) {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({"status":"Error Usuario no encontrado"});
    res.status(200).json(usuario);
  } catch (err) {
    console.error("Error en getUsuario:", err.message);
    res.status(500).json({"status":"Error al obtener el Usuario"});
  }
}

async function crearUsuario(req, res) {
  try {
    const newUsuario = new Usuario(req.body);
    await newUsuario.save();
    res.status(201).json(newUsuario);
  } catch (err) {
    console.error("Error en crearUsuario:", err.message);
    res.status(500).json({"status":"Error al crear el Usuario"});
  }
}

async function actualizarUsuario(req, res) {
  try {
    const updatedUsuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUsuario) return res.status(404).json({"status":"Error Usuario no encontrado"});
    res.status(200).json(updatedUsuario);
  } catch (err) {
    console.error("Error en actualizarUsuario:", err.message);
    res.status(500).json({"status":"Error al actualizar el Usuario"});
  }
}

async function eliminarUsuario(req, res) {
  try {
    const deletedUsuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!deletedUsuario) return res.status(404).json({"status":"Error Usuario no encontrado"});
    res.status(200).json({"status":"operación realizada"});
  } catch (err) {
    console.error("Error en eliminarUsuario:", err.message);
    res.status(500).json({"status":"Error al eliminar el Usuario"});
  }
}

async function login(req, res) { //FUNCIÓN DE LOGIN
  try {
    const datos = req.body || {};
    const correo = datos.correo;
    const contrasena = datos.contrasena;

    if (typeof correo !== 'string' || typeof contrasena !== 'string') {
      return res.status(400).json({"status":"Faltan el correo o la contraseña"});
    }

    const usuario = await Usuario.findOne({ correo: correo, contrasena: contrasena });
    if (!usuario) return res.status(401).json({"status":"Correo o contraseña incorrectos"});

    res.status(200).json({ _id: usuario._id, correo: usuario.correo, rol: usuario.rol });
  } catch (err) {
    console.error("Error en login:", err.message);
    res.status(500).json({"status":"Error al iniciar sesión"});
  }
}

async function registro(req, res) {
  try {
    const datos = req.body || {};
    const correo = datos.correo;
    const contrasena = datos.contrasena;

    if (typeof correo !== 'string' || typeof contrasena !== 'string' || correo === '' || contrasena === '') {
      return res.status(400).json({"status":"Faltan el correo o la contraseña"});
    }

    const existente = await Usuario.findOne({ correo: correo });
    if (existente) return res.status(409).json({"status":"Ya existe un usuario con ese correo"});

    const nuevoUsuario = new Usuario({ correo: correo, contrasena: contrasena, rol: 'usuario' });
    await nuevoUsuario.save();

    res.status(201).json({ _id: nuevoUsuario._id, correo: nuevoUsuario.correo, rol: nuevoUsuario.rol });
  } catch (err) {
    console.error("Error en registro:", err.message);
    res.status(500).json({"status":"Error al registrar el usuario"});
  }
}

module.exports = { getUsuarios, getUsuario, crearUsuario, actualizarUsuario, eliminarUsuario, login, registro };