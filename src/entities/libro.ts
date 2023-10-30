import readline from "readline";
import Biblioteca from "../service/biblioteca";

class Libro {
    private prestado: boolean = false;

    constructor(public id: number, public titulo: string, public autorEditor: string, public anoPublicacion: number) { }

    static crearNuevoLibro(rl: readline.Interface, biblioteca: Biblioteca) {
        return new Promise<Libro>((resolve) => {
            console.log("Agregar nuevo libro:");

            rl.question("Título: ", function (titulo) {
                rl.question("Autor/Editor: ", function (autorEditor) {
                    rl.question("Año de publicación: ", function (anoPublicacion) {
                        // Generar un nuevo ID para el libro (puedes ajustarlo según tu lógica)
                        const nuevoId = biblioteca.listarLibros().length + 1;

                        // Crear una instancia de Libro con los datos ingresados
                        const nuevoLibro = new Libro(nuevoId, titulo, autorEditor, parseInt(anoPublicacion));

                        console.log(`Nuevo libro agregado: ${titulo}`);
                        resolve(nuevoLibro);
                    });
                });
            });
        });
    }

    editarLibro(titulo: string, autorEditor: string, anoPublicacion: number) {
        this.titulo = titulo;
        this.autorEditor = autorEditor;
        this.anoPublicacion = anoPublicacion;
    }

    eliminarLibro(biblioteca: Biblioteca) {
        const index = biblioteca.listarLibros().findIndex((libro) => libro.id === this.id);
        if (index !== -1) {
            biblioteca.listarLibros().splice(index, 1); // Elimina el libro de la lista de libros de la biblioteca
        }
    }

    marcarComoPrestado() {
        if (this.estaPrestado()) {
            return false;
        }
        this.prestado = true;
        return true;
    }

    estaPrestado() {
        return this.prestado;
    }

    estaDisponible() {
        return !this.prestado;
    }

    marcarComoDisponible() {
        this.prestado = false;
    }
}

export default Libro;
