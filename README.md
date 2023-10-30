Crear un sistema de gestión de biblioteca que permita administrar libros, revistas y usuarios de la biblioteca.
Los libros y revistas tienen propiedades como título, autor/editor y año de publicación. Los usuarios de la biblioteca tienen propiedades como nombre, dirección y número de teléfono.
El sistema debe permitir realizar préstamos y devoluciones de libros y revistas.
Existencia, Libros y Revistas representan elementos de la biblioteca, como libros y revistas, y sus respectivas propiedades.
Usuario representa un usuario de la biblioteca con propiedades como nombre, dirección y número de teléfono. Préstamo representa un préstamo de un elemento de la biblioteca a un usuario. Administración

1- Administración de biblioteca.

1.1- Creación y gestión de usuarios
1.2- Creación y gestión de libros
1.3- Creación y gestión de revistas
Gestionar estas entidades implica su creación, listado, edición y eliminación.
Cada entidad debe contar con un identificador único para mantener la integridad referencial.

2- Gestión de préstamos y devoluciones.

2.1- Validar que no se pueda prestar un artículo si otro usuario lo tiene en préstamos.
2.2- Validar que no se pueda prestar un ítem si el usuario no está registrado.
2.3- Validar que no se pueda prestar un ítem si el usuario registrado está penalizado.
2.4- El préstamo debe indicar el día de inicio (fecha del préstamo) y la fecha de devolución (calcular una semana más desde la fecha de inicio).
2.5- Crear una escala de penalización que sume puntos al scoring del usuario: 1 día después de la fecha: 2 puntos; entre 2 y 5 días después de la fecha: 3 puntos; más de 5 días: 5 puntos. Al acumular 6 puntos el usuario recibe una penalización que lo imposibilita de retirar artículos por una semana.

3- Creación y gestión de estadísticas.

3.1- Llevar registro de todos los préstamos en un archivo. Cada registro debería incluir la fecha del préstamo, el título y el nombre del usuario.