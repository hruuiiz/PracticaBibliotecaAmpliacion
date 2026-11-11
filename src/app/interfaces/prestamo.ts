export interface Prestamo {
  id: number,
  idLibro: number,
  idUsuario: number,
  fechaPrestamo: string,
  fechaDevolucion: string,
  ampliado: boolean,
  devuelto: boolean
}
