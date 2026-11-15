const mongoose = require('mongoose');
const datos = require('./datos/datosEjemplo.json');
const Libro = require('./modelos/Libro');
const Prestamo = require('./modelos/Prestamo');
const Usuario = require('./modelos/Usuario');

async function cargar() {
  await mongoose.connect('mongodb://root:example@localhost:27017/2daw?authSource=admin');

  await Usuario.deleteMany({});
  await Libro.deleteMany({});
  await Prestamo.deleteMany({});

  const usuarios = await Usuario.insertMany(datos.usuarios);
  const libros = await Libro.insertMany(datos.libros);

  // Los préstamos se enlazan con los _id reales usando correo y título
  const prestamos = datos.prestamos.map(p => ({
    idLibro: String(libros.find(l => l.titulo === p.titulo)._id),
    idUsuario: String(usuarios.find(u => u.correo === p.correo)._id),
    fechaPrestamo: p.fechaPrestamo,
    fechaDevolucion: p.fechaDevolucion,
    ampliado: p.ampliado,
    devuelto: p.devuelto
  }));
  await Prestamo.insertMany(prestamos);

  console.log('Datos cargados:', usuarios.length, 'usuarios,', libros.length, 'libros,', prestamos.length, 'préstamos');
  await mongoose.disconnect();
}

cargar().catch(err => {
  console.error('Error cargando datos:', err.message);
  process.exit(1);
});