import readline from 'readline';
import Biblioteca from "../service/biblioteca";
import { volverAlMenuPrincipal } from '../..';

function mostrarMenuDevoluciones(rl: readline.Interface, biblioteca: Biblioteca) {
    console.log("\n--- Menú Devoluciones ---");
    console.log("1. Realizar devolución");
    console.log("2. Listar devoluciones pendientes");
    console.log("9. Volver al menú principal");

    rl.question('Seleccione una opción: ', (opcionDevolucion) => {
        switch (opcionDevolucion) {
            case "1":
                rl.question("ID del usuario: ", function (idUsuario) {
                    rl.question("ID del libro o revista: ", function (idElemento) {
                        const usuario = biblioteca.obtenerUsuarioPorId(Number(idUsuario));
                        const elemento = biblioteca.obtenerLibroORevistaPorId(Number(idElemento));

                        if (!usuario || !elemento) {
                            console.log("El usuario o el elemento no existen.");
                            volverAlMenuDevoluciones(rl, biblioteca);
                        } else {
                            const exito = biblioteca.realizarDevolucion(usuario, elemento);
                            if (exito) {
                                console.log("Devolución realizada con éxito.");
                            } else {
                                console.log("No se pudo realizar la devolución.");
                            }
                        }
                        volverAlMenuDevoluciones(rl, biblioteca);
                    });
                });
                break;
            case "2":
                const devolucionesPendientes = biblioteca.listarDevolucionesPendientes();
                if (devolucionesPendientes.length === 0) {
                    console.log("No hay devoluciones pendientes.");
                } else {
                    console.log("Devoluciones pendientes:");
                    devolucionesPendientes.forEach((devolucion) => {
                        console.log(`ID: ${devolucion.id}`);
                        console.log(`Usuario: ${devolucion.usuario.nombre}`);
                        console.log(`Elemento: ${devolucion.elemento.titulo}`);
                        console.log(`Fecha de devolución: ${devolucion.fechaDevolucion}`);
                    });
                }
                volverAlMenuDevoluciones(rl, biblioteca);
                break;
            case "9":
                volverAlMenuPrincipal();
                break;
            default:
                console.log("Opción no válida.");
                volverAlMenuDevoluciones(rl, biblioteca);
                break;
        }
    });
}

function volverAlMenuDevoluciones(rl: readline.Interface, biblioteca: Biblioteca) {
    mostrarMenuDevoluciones(rl, biblioteca);
}

export default mostrarMenuDevoluciones;