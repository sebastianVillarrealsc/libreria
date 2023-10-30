import readline from 'readline';
import { volverAlMenuPrincipal } from "../..";
import Biblioteca from '../service/biblioteca';

function mostrarMenuPrestamos(rl: readline.Interface, biblioteca: Biblioteca) {
    console.log("\n--- Menú Préstamos ---");
    console.log("1. Realizar préstamo");
    console.log("2. listar Préstamos registrados:");
    console.log("9. Volver al menú principal");

    rl.question('Seleccione una opción: ', (opcionPrestamo) => {
        switch (opcionPrestamo) {
            case "1":
                rl.question("ID del usuario: ", function (idUsuario) {
                    rl.question("ID del libro o revista: ", function (idElemento) {
                        const usuario = biblioteca.obtenerUsuarioPorId(Number(idUsuario));
                        const elemento = biblioteca.obtenerLibroORevistaPorId(Number(idElemento));

                        if (!usuario) {
                            console.log("El usuario no está registrado.");
                            volverAlMenuPrestamos(rl, biblioteca);
                            return;
                        }

                        if (!elemento) {
                            console.log("El libro o revista no existe.");
                            volverAlMenuPrestamos(rl, biblioteca);
                            return;
                        }

                        // Intentar realizar el préstamo llamando al método de la biblioteca
                        if (biblioteca.realizarPrestamo(usuario, elemento)) {
                            console.log("Préstamo realizado con éxito.");
                        } else {
                            console.log("No se pudo realizar el préstamo.");
                        }
                        volverAlMenuPrestamos(rl, biblioteca);
                    });
                });
                break;
            case "2":
                const prestamosRegistrados = biblioteca.listarPrestamosRegistrados();
                if (prestamosRegistrados.length === 0) {
                    console.log("No hay préstamos registrados.");
                } else {
                    console.log("Préstamos registrados:");
                    prestamosRegistrados.forEach((prestamo) => {
                        console.log(`ID: ${prestamo.id}`);
                        console.log(`Usuario: ${prestamo.usuario.nombre}`);
                        console.log(`Elemento: ${prestamo.elemento.titulo}`);
                        console.log(`Fecha de inicio: ${prestamo.fechaInicio}`);
                        console.log(`Fecha de devolución: ${prestamo.fechaDevolucion}`);
                    });
                }
                volverAlMenuPrestamos(rl, biblioteca);
                break;
            case "9":
                volverAlMenuPrincipal();
                break;
            default:
                console.log("Opción no válida.");
                volverAlMenuPrestamos(rl, biblioteca);
                break;
        }
    });
}

function volverAlMenuPrestamos(rl: readline.Interface, biblioteca: Biblioteca) {
    mostrarMenuPrestamos(rl, biblioteca);
}

export default mostrarMenuPrestamos;
