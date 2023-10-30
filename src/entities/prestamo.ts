import Usuario from "./usuario";
import Libro from "./libro";
import Revista from "./revista";
import { registrarPrestamo } from "./registrarPrestamos";

class Prestamo {
    private prestamos: Prestamo[] = [];
    constructor(public id: number, public usuario: Usuario, public elemento: Libro | Revista, public fechaInicio: Date, public fechaDevolucion: Date) { }

    // Método para validar si el préstamo es posible
    validarPrestamo(usuario: Usuario, elemento: Libro | Revista): boolean {

        // Verificar si el usuario está penalizado
        if (usuario.estaPenalizado()) {
            return false;
        }

        const prestamosActivos = this.prestamos.filter((prestamo) => prestamo.usuario !== usuario);
        const tienePrestamoActivo = prestamosActivos.some((prestamo) => prestamo.elemento === elemento);

        if (tienePrestamoActivo) {
            return false;
        }

        // Verificar si el elemento está disponible para préstamo
        if (!elemento.estaDisponible()) {
            return false;
        }
        return true;
    }

    // Método para realizar el préstamo
    realizarPrestamo(usuario: Usuario, elemento: Libro | Revista): boolean {
        if (this.validarPrestamo(usuario, elemento)) {
            this.elemento.marcarComoPrestado();
            const fechaInicio = new Date();
            const fechaDevolucion = new Date(fechaInicio);
            fechaDevolucion.setDate(fechaInicio.getDate() + 7); // Suponiendo una semana de préstamo
            console.log(`Fecha de devolución: ${fechaDevolucion}`);
            registrarPrestamo(this);
            return true;
        } else {
            return false;
        }
    }
}

export default Prestamo;
