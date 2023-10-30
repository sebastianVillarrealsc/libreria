import readline from 'readline';
import Biblioteca from '../service/biblioteca';

class Usuario {
    private penalizado: boolean = false;

    constructor(public id: number, public nombre: string, public direccion: string, public numeroTelefono: string, public puntosPenalizacion: number = 0) { }

    static crearNuevoUsuario(rl: readline.Interface, biblioteca: Biblioteca) {
        return new Promise<Usuario>((resolve) => {
            console.log("Agregar nuevo usuario:");

            rl.question("Nombre: ", function (nombre) {
                rl.question("Dirección: ", function (direccion) {
                    rl.question("Número de Teléfono: ", function (numeroTelefono) {
                        // Generar un nuevo ID para el usuario (puedes ajustarlo según tu lógica)
                        const nuevoId = biblioteca.listarUsuarios().length + 1; // Incrementar a partir del último ID existente
                        // Crear una instancia de Usuario con los datos ingresados
                        const nuevoUsuario = new Usuario(nuevoId, nombre, direccion, numeroTelefono);

                        console.log(`Nuevo usuario agregado: ${nombre}`);
                        resolve(nuevoUsuario);
                    });
                });
            });
        });
    }

    editarUsuario(nombre: string, direccion: string, numeroTelefono: string) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.numeroTelefono = numeroTelefono;
    }

    eliminarUsuario(biblioteca: Biblioteca) {
        const index = biblioteca.listarUsuarios().findIndex((usuario) => usuario.id === this.id);
        if (index !== -1) {
            biblioteca.listarUsuarios().splice(index, 1); // Elimina el usuario de la lista de usuarios de la biblioteca
        }
    }

    // Método para verificar si el usuario está penalizado
    estaPenalizado(): boolean {
        const unbralPenalizacion = 6;
        return this.puntosPenalizacion >= unbralPenalizacion;
    }

    // Método para sumar puntos de penalización
    sumarPuntosPenalizacion(puntos: number): void {
        this.puntosPenalizacion += puntos;
    }

    // Método para obtener la cantidad actual de puntos de penalización
    obtenerPuntosPenalizacion(): number {
        return this.puntosPenalizacion;
    }

    // Método para establecer el estado de penalización
    establecerPenalizacion(penalizado: boolean): void {
        this.penalizado = penalizado;
    }
}

export default Usuario;
