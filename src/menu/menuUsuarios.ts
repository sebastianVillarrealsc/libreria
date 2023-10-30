import readline from 'readline';
import Usuario from '../entities/usuario';
import Biblioteca from '../service/biblioteca';
import { volverAlMenuPrincipal } from '../..';

function mostrarMenuUsuarios(rl: readline.Interface, biblioteca: Biblioteca) {
    console.log("\n--- Menú Usuarios ---");
    console.log("1. Listar usuarios");
    console.log("2. Crear nuevo usuario");
    console.log("3. Editar usuario");
    console.log("4. Eliminar usuario");
    console.log("5. Volver al menú principal");

    rl.question('Seleccione una opción: ', async function (opcionUsuario) {
        switch (opcionUsuario) {
            case "1":
                console.log(biblioteca.listarUsuarios());
                volverAlMenuUsuarios(rl, biblioteca);
                break;
            case "2":
                const nuevoUsuario = await Usuario.crearNuevoUsuario(rl, biblioteca);
                biblioteca.agregarUsuario(nuevoUsuario);
                console.log("Nuevo usuario agregado.");
                volverAlMenuUsuarios(rl, biblioteca)
                break;
            case "3":
                rl.question("Ingrese el ID del usuario que desea editar: ", function (idUsuario) {
                    const usuarioAEditar = biblioteca.listarUsuarios().find((usuario) => usuario.id === Number(idUsuario));
                    if (!usuarioAEditar) {
                        console.log("Usuario no encontrado.");
                        volverAlMenuUsuarios(rl, biblioteca)
                    } else {
                        rl.question("Nuevo nombre: ", function (nombre) {
                            rl.question("Nueva dirección: ", function (direccion) {
                                rl.question("Nuevo número de Teléfono: ", function (numeroTelefono) {
                                    usuarioAEditar.editarUsuario(nombre, direccion, numeroTelefono);
                                    console.log("Usuario editado exitosamente.");
                                    volverAlMenuUsuarios(rl, biblioteca)
                                });
                            });
                        });
                    }
                });
                break;
            case "4":
                rl.question("Ingrese el ID del usuario que desea eliminar: ", function (idUsuario) {
                    const usuarioAEliminar = biblioteca.listarUsuarios().find((usuario) => usuario.id === Number(idUsuario));
                    if (!usuarioAEliminar) {
                        console.log("Usuario no encontrado.");
                        volverAlMenuUsuarios(rl, biblioteca)
                    } else {
                        usuarioAEliminar.eliminarUsuario(biblioteca);
                        console.log("Usuario eliminado exitosamente.");
                        volverAlMenuUsuarios(rl, biblioteca)
                    }
                });
                break;
            case "5":
                volverAlMenuPrincipal();
                break;
            default:
                console.log("Opción no válida.");
                volverAlMenuUsuarios(rl, biblioteca)
                break;
        }
    });
}

function volverAlMenuUsuarios(rl: readline.Interface, biblioteca: Biblioteca) {
    mostrarMenuUsuarios(rl, biblioteca);
}

export default mostrarMenuUsuarios;
