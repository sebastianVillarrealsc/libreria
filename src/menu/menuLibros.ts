import readline from "readline";
import Biblioteca from "../service/biblioteca";
import Libro from "../entities/libro";
import { volverAlMenuPrincipal } from "../..";

function mostrarMenuLibros(rl: readline.Interface, biblioteca: Biblioteca) {
    console.log("\n--- Menú Libros ---");
    console.log("1. Listar libros");
    console.log("2. Crear nuevo libro");
    console.log("3. Editar libro");
    console.log("4. Eliminar libro");
    console.log("5. Volver al menú principal");

    rl.question('Seleccione una opción: ', async function (opcionLibro) {
        switch (opcionLibro) {
            case "1":
                console.log(biblioteca.listarLibros());
                volverAlMenuLibros(rl, biblioteca);
                break;
            case "2":
                const nuevoLibro = await Libro.crearNuevoLibro(rl, biblioteca);
                biblioteca.agregarLibro(nuevoLibro);
                console.log("Nuevo libro agregado.");
                volverAlMenuLibros(rl, biblioteca);
                break;
            case "3":
                rl.question("Ingrese el ID del libro que desea editar: ", function (idLibro) {
                    const libroAEditar = biblioteca.listarLibros().find((libro) => libro.id === Number(idLibro));
                    if (!libroAEditar) {
                        console.log("Libro no encontrado.");
                        volverAlMenuLibros(rl, biblioteca);
                    } else {
                        console.log(`Editar libro: ${libroAEditar.titulo}`);
                        rl.question("Nuevo título: ", function (nuevoTitulo) {
                            rl.question("Nuevo autor/editor: ", function (nuevoAutorEditor) {
                                rl.question("Nuevo año de publicación: ", function (nuevoAnoPublicacion) {
                                    libroAEditar.editarLibro(nuevoTitulo, nuevoAutorEditor, parseInt(nuevoAnoPublicacion));
                                    console.log("Libro editado exitosamente.");
                                    volverAlMenuLibros(rl, biblioteca);
                                });
                            });
                        });
                    }
                });
                break;
            case "4":
                rl.question("Ingrese el ID del libro que desea eliminar: ", function (idLibro) {
                    const libroAEliminar = biblioteca.listarLibros().find((libro) => libro.id === Number(idLibro));
                    if (!libroAEliminar) {
                        console.log("Libro no encontrado.");
                        volverAlMenuLibros(rl, biblioteca);
                    } else {
                        // Llama al método para eliminar libro
                        libroAEliminar.eliminarLibro(biblioteca);
                        console.log("Libro eliminado exitosamente.");
                        volverAlMenuLibros(rl, biblioteca);
                    }
                });
                break;
            case "5":
                volverAlMenuPrincipal();
                break;
            default:
                console.log("Opción no válida.");
                volverAlMenuLibros(rl, biblioteca);
                break;
        }
    });
}

function volverAlMenuLibros(rl: readline.Interface, biblioteca: Biblioteca) {
    mostrarMenuLibros(rl, biblioteca);
}

export default mostrarMenuLibros;
