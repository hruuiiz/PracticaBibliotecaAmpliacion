export interface Prestamo {
  _id: string,
  idLibro: string,
  idUsuario: string,
  fechaPrestamo: string,
  fechaDevolucion: string,
  ampliado: boolean,
  devuelto: boolean
}
