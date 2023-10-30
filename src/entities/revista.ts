import readline from "readline";
import Biblioteca from "../service/biblioteca";

class Revista {
    private prestado: boolean = false;

    constructor(public id: number, public titulo: string, public autorEditor: string, public anoPublicacion: number) { }

    static crearNuevaRevista(rl: readline.Interface, biblioteca: Biblioteca) {
        return new Promise<Revista>((resolve) => {
            console.log("Agregar nueva revista:");

            rl.question("Título: ", function (titulo) {
                rl.question("Editor: ", function (editor) {
                    rl.question("Año de publicación: ", function (anoPublicacion) {
                        // Generar un nuevo ID para la revista (puedes ajustarlo según tu lógica)
                        const nuevoId = biblioteca.listarRevistas().length + 1;

                        // Crear una instancia de Revista con los datos ingresados
                        const nuevaRevista = new Revista(nuevoId, titulo, editor, parseInt(anoPublicacion));

                        console.log(`Nueva revista agregada: ${titulo}`);
                        resolve(nuevaRevista);
                    });
                });
            });
        });
    }

    editarRevista(titulo: string, editor: string, anoPublicacion: number) {
        this.titulo = titulo;
        this.autorEditor = editor;
        this.anoPublicacion = anoPublicacion;
    }

    eliminarRevista(biblioteca: Biblioteca) {
        const index = biblioteca.listarRevistas().findIndex((revista) => revista.id === this.id);
        if (index !== -1) {
            biblioteca.listarRevistas().splice(index, 1);
        }
    }

    marcarComoPrestado() {
        this.prestado = true;
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

export default Revista;
