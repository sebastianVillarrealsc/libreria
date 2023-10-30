import Prestamo from "./prestamo";
const fs = require('fs');

export function registrarPrestamo(prestamo: Prestamo) {
    const registro = `${prestamo.fechaInicio.toISOString()} - Usuario: ${prestamo.usuario.nombre}, Título: ${prestamo.elemento.titulo}\n`;

    // Define la ruta del archivo donde se registrará el préstamo
    const archivoRegistro = 'registro_prestamos.txt';

    // Añade el registro al archivo (si el archivo no existe, se creará automáticamente)
    fs.appendFile(archivoRegistro, registro, (err: any) => {
        if (err) {
            console.error('Error al registrar el préstamo:', err);
        } else {
            console.log('Préstamo registrado con éxito.');
        }
    });
}
