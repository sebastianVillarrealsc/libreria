import { volverAlMenuPrincipal } from "../..";
import Revista from "../entities/revista";
import Biblioteca from "../service/biblioteca";
import readline from "readline";

function mostrarMenuRevistas(rl: readline.Interface, biblioteca: Biblioteca) {
    console.log("\n--- Menú Revistas ---");
    console.log("1. Listar revistas");
    console.log("2. Crear nueva revista");
    console.log("3. Editar revista");
    console.log("4. Eliminar revista");
    console.log("5. Volver al menú principal");

    rl.question('Seleccione una opción: ', async function (opcionRevista) {
        switch (opcionRevista) {
            case "1":
                console.log(biblioteca.listarRevistas());
                volverAlMenuRevistas(rl, biblioteca)
                break;
            case "2":
                const nuevaRevista = await Revista.crearNuevaRevista(rl, biblioteca);
                biblioteca.agregarRevista(nuevaRevista);
                console.log("Nueva revista agregada.");
                volverAlMenuRevistas(rl, biblioteca)
                break;
            case "3":
                rl.question("Ingrese el ID de la revista que desea editar: ", function (idRevista) {
                    const revistaAEditar = biblioteca.listarRevistas().find((revista) => revista.id === Number(idRevista));
                    if (!revistaAEditar) {
                        console.log("Revista no encontrada.");
                        volverAlMenuRevistas(rl, biblioteca)
                    } else {
                        rl.question("Nuevo título: ", function (titulo) {
                            rl.question("Nuevo editor: ", function (editor) {
                                rl.question("Nuevo año de publicación: ", function (anoPublicacion) {
                                    revistaAEditar.editarRevista(titulo, editor, parseInt(anoPublicacion));
                                    console.log("Revista editada exitosamente.");
                                    volverAlMenuRevistas(rl, biblioteca)
                                });
                            });
                        });
                    }
                });
                break;
            case "4":
                rl.question("Ingrese el ID de la revista que desea eliminar: ", function (idRevista) {
                    const revistaAEliminar = biblioteca.listarRevistas().find((revista) => revista.id === Number(idRevista));
                    if (!revistaAEliminar) {
                        console.log("Revista no encontrada.");
                        volverAlMenuRevistas(rl, biblioteca)
                    } else {
                        // Llama al método para eliminar revista
                        revistaAEliminar.eliminarRevista(biblioteca);
                        console.log("Revista eliminada exitosamente.");
                        volverAlMenuRevistas(rl, biblioteca)
                    }
                });
                break;
            case "5":
                volverAlMenuPrincipal();
                break;
            default:
                console.log("Opción no válida.");
                volverAlMenuRevistas(rl, biblioteca);
                break;
        }
    });
}

function volverAlMenuRevistas(rl: readline.Interface, biblioteca: Biblioteca) {
    mostrarMenuRevistas(rl, biblioteca);
}

export default mostrarMenuRevistas;
