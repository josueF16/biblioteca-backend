AUTENTICACION

Registro de Usuario
Método: POST
URL: http://127.0.0.1:8000/auth/register
{
  "nombre": "Nombre del usuario",
  "email": "correo@example.com",
  "password": "contraseña"
}


Inicio de Sesión
Método: POST
URL: http://127.0.0.1:8000/auth/login
Cuerpo (JSON):
{
  "email": "correo@example.com",
  "password": "contraseña"
}

Cierre de Sesión
Método: POST
URL: http://127.0.0.1:8000/auth/logout



CATEGORIAS

Obtener Categorías [GET]

GET http://127.0.0.1:8000/categorias
Este endpoint devuelve todas las categorías existentes en la base de datos.

Crear Categoría [POST]

POST http://127.0.0.1:8000/categorias/crear
Content-Type: application/json

{
  "nombre": "Italiana"
}
Este endpoint crea una nueva categoría con el nombre "Italiana".

Editar Categoría [PUT]

PUT http://127.0.0.1:8000/categorias/editar/{id}
Content-Type: application/json

{
  "nombre": "Mexicana"
}
Este endpoint edita la categoría con el ID especificado en la URL, cambiando su nombre a "Mexicana".

Eliminar Categoría [DELETE]

DELETE http://127.0.0.1:8000/categorias/eliminar/{id}
Este endpoint elimina la categoría con el ID especificado en la URL.

Obtener Categoría por su ID [GET]

GET http://127.0.0.1:8000/categorias/categoria/{id}
Este endpoint devuelve la categoría con el ID especificado en la URL.

PLATOS

Obtener todos los platos [GET]

GET http://127.0.0.1:8000/platos
Este endpoint devuelve todos los platos existentes en la base de datos.

Crear un nuevo plato [POST]

POST http://127.0.0.1:8000/platos/crear
Content-Type: application/json

{
  "nombre": "Pizza Margarita",
  "ingredientes": ["Mozzarella", "Tomate", "Albahaca"],
  "descripcion": "Una deliciosa pizza clásica con tomate, mozzarella y albahaca.",
  "precio": 10.99,
  "categoria": "61234abcde1234567890abcd"  // ObjectId de la categoría
}
Este endpoint crea un nuevo plato con los datos proporcionados en el cuerpo de la solicitud.

Editar un plato [PUT]

PUT http://127.0.0.1:8000/platos/editar/{id}
Content-Type: application/json

{
  "nombre": "Pizza Pepperoni",
  "ingredientes": ["Mozzarella", "Pepperoni", "Tomate"],
  "descripcion": "Una deliciosa pizza con pepperoni, mozzarella y tomate.",
  "precio": 12.99,
  "categoria": "61234abcde1234567890abcd"  // ObjectId de la categoría
}
Este endpoint edita el plato con el ID especificado en la URL, cambiando sus datos según los proporcionados en el cuerpo de la solicitud.

Eliminar un plato [DELETE]

DELETE http://127.0.0.1:8000/platos/eliminar/{id}
Este endpoint elimina el plato con el ID especificado en la URL.

Obtener un plato por su ID [GET]

GET http://127.0.0.1:8000/platos/plato/{id}
Este endpoint devuelve el plato con el ID especificado en la URL.

Obtener platos por una categoría específica [GET]

GET http://127.0.0.1:8000/platos/porCategoria/{categoria}
Este endpoint devuelve todos los platos que pertenecen a la categoría especificada en la URL.

MENUS

Obtener todos los menús [GET]
GET http://127.0.0.1:8000/menus/menus

Crear un nuevo menú [POST]
POST http://127.0.0.1:8000/menus/crear
Headers: Content-Type: application/json
Body:

json
{
  "nombre": "Menú Ejemplo",
  "descripcion": "Descripción del menú",
  "platos": ["idPlato1", "idPlato2"]
}

Editar un menú [PUT]
PUT http://127.0.0.1:8000/menus/editar/{id}
Headers: Content-Type: application/json
Body:

json
Copiar código
{
  "nombre": "Menú Editado",
  "descripcion": "Nueva descripción del menú",
  "platos": ["idPlato1", "idPlato2", "idPlato3"]
}

Eliminar un menú [DELETE]
DELETE http://127.0.0.1:8000/menus/eliminar/{id}

Obtener un menú por su ID [GET]
GET http://127.0.0.1:8000/menus/menu/{id}

Contar el número total de menús [GET]
GET http://127.0.0.1:8000/menus/totalMenus

Obtener todos los menús que contienen un plato con un nombre específico [GET]
GET http://127.0.0.1:8000/menus/menusPorNombrePlato/{nombrePlato}

Eliminar un plato de un menú [PUT]
PUT http://127.0.0.1:8000/menus/eliminarPlato/{menuId}/{platoId}

Agregar un plato a un menú [PUT]
PUT http://127.0.0.1:8000/menus/agregarPlato/{menuId}
Headers: Content-Type: application/json
Body:

json
{
  "platoId": "idPlato"
}