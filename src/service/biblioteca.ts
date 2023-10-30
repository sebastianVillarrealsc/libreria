import Usuario from "../entities/usuario";
import Libro from "../entities/libro";
import Revista from "../entities/revista";
import Prestamo from "../entities/prestamo";

class Biblioteca {
    private usuarios: Usuario[] = [];
    private libros: Libro[] = [];
    private revistas: Revista[] = [];
    private prestamos: Prestamo[] = [];

    private static instance: Biblioteca;

    public static getInstance(): Biblioteca {
        if (!Biblioteca.instance) {
            Biblioteca.instance = new Biblioteca();
        }
        return Biblioteca.instance;
    }

    public agregarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
    }

    public listarUsuarios(): Usuario[] {
        return this.usuarios;
    }

    public agregarLibro(libro: Libro): void {
        this.libros.push(libro);
    }

    public listarLibros(): Libro[] {
        return this.libros;
    }

    public agregarRevista(revista: Revista): void {
        this.revistas.push(revista);
    }

    public listarRevistas(): Revista[] {
        return this.revistas;
    }

    realizarPrestamo(usuario: Usuario, elemento: Libro | Revista): boolean {
        const nuevoPrestamo = new Prestamo(this.prestamos.length + 1, usuario, elemento, new Date(), new Date());
        if (nuevoPrestamo.realizarPrestamo(usuario, elemento)) {
            this.prestamos.push(nuevoPrestamo);
            return true;
        } else {
            return false;
        }
    }

    listarPrestamosRegistrados() {
        return this.prestamos;
    }

    realizarDevolucion(usuario: Usuario, elemento: Libro | Revista): boolean {
        // Verificar si el usuario tiene préstamos activos
        const prestamosUsuario = this.prestamos.filter((prestamo) => prestamo.usuario === usuario);

        // Verificar si el elemento corresponde a uno de los préstamos del usuario
        const prestamo = prestamosUsuario.find((prestamo) => prestamo.elemento === elemento);

        if (prestamo) {
            // Calcular la diferencia de días entre la fecha de devolución y la fecha límite
            const fechaDevolucion = new Date();
            const fechaPrestamo = prestamo.fechaDevolucion;
            const diferenciaMilisegundos = fechaDevolucion.getTime() - fechaPrestamo.getTime();
            const diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

            // Verificar si hubo retraso y aplicar penalización
            if (diferenciaDias > 0) {
                // Aplicar penalización según la escala definida
                let puntosPenalizacion = 0;
                if (diferenciaDias === 1) {
                    puntosPenalizacion = 2;
                } else if (diferenciaDias >= 2 && diferenciaDias <= 5) {
                    puntosPenalizacion = 3;
                } else {
                    puntosPenalizacion = 5;
                }

                // Sumar los puntos de penalización al usuario
                usuario.sumarPuntosPenalizacion(puntosPenalizacion);

                // Verificar si el usuario alcanzó la penalización máxima
                if (usuario.obtenerPuntosPenalizacion() >= 6) {
                    usuario.establecerPenalizacion(true);
                }
            }

            // Marcar el elemento como disponible
            elemento.marcarComoDisponible();

            // Eliminar el préstamo de la lista de préstamos de la biblioteca
            const index = this.prestamos.indexOf(prestamo);
            if (index !== -1) {
                this.prestamos.splice(index, 1);
            }
            return true;
        }

        return false;
    }

    listarDevolucionesPendientes() {
        return this.prestamos.filter((prestamo) => prestamo.fechaDevolucion < new Date());
    }

    // Método para obtener un usuario por su ID
    obtenerUsuarioPorId(id: number): Usuario | undefined {
        return this.usuarios.find((usuario) => usuario.id === id);
    }

    // Método para obtener un libro o revista por su ID
    obtenerLibroORevistaPorId(id: number): Libro | Revista | undefined {
        const libro = this.libros.find((libro) => libro.id === id);
        if (libro) {
            return libro;
        }

        const revista = this.revistas.find((revista) => revista.id === id);
        return revista;
    }
}

export default Biblioteca;
