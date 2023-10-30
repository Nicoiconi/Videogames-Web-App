# Videogames-Web-App

Un clásico proyecto con pedidos a una API y posibilidad de crear tu propio juego.
Tiene la posibilidiad de buscar por nombre (trae todos los juegos que councidan con la/s palabra/s), barra de filtros y paginado.
Presionar el nombre de algún juego te redireccionará a una vista con el detalle del juego.

Renovado - Ahora

Solicitud de videojuegos a la api. Se puede elegir la cantidad, con un máximo de 40.
Botón guardar en la base de datos del navegador (IndexedDB), otro para solicitarlos y otro para eliminarlos todos.
Filtros combinados por nombre, género, plataforma y rating. Botón para limpiar los filtros.
Se pueden ordenar alfabéticamente, de la A a la Z o al inverso; y por rating, de menor a mayor o de mayor a menor.
Desde la tarjeta, se puede presionar el nombre del juego para acceder al detalle y redirige a la vista individual. Si el juego no fue creado desde el formulario, va a utilizar el id para solicitar el detalle completo del videojuego a la api. Si el juego esta guardado en la base de datos renderiza un boton para eliminarlo de la base de datos.
Usa Context para controlar el juego a mostrar en la vista de detalle.
Botón que redirige al formulario para crear un video juego. Al crear comprueba que el id o el nombre no se repitan.
Link "BACK TO HOME" en cada ruta.

React-Router-DOM versión 6.17.0 (antes 5.2.0)
React & React DOM versión 18.2.0 (antes 17.0.2)

----

Antes

Tecnologias utilizadas a destacar:
front:
  - React (para react-router-dom la version "^5.2.0")
  - Redux
  - Axios
back:
  - Express
  - Sequelize
  - Cloudinary


Cloudinary

https://cloudinary.com/

Para poder subir imagenes a una carpeta tienen que ir a Settings / Upload y en "Upload presets", "Add upload preset" (le asignan un nombre y una carpeta, pueden ser iguales)

Lo instalamos en el back:
  npm i cloudinary

Hacemos la conexión:

  const cloudinary = require("cloudinary").v2;
  const { cloudinaryName, cloudinaryApiKey, cloudinaryApiSecret } = require("../utils/config");
  // Podes usar las variables de entorno directamente
  cloudinary.config({
    cloud_name: cloudinaryName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret
  });

  module.exports = cloudinary;

la imagen se postea en el back (en el controller o ruta)
si esta todo ok y se sube la imagen, Cloudinary devuelve un objeto con datos, el public_id sirve para eliminar la imagen de la nube (se utuliza para modificar la imagen de un, en este caso, videojuego y para eliminarlo)

Subir imagen a la nube

  const cloudinary = require("ruta a la conexion de cloudinary");

  const uploadResponse = await cloudinary.uploader.upload(videogame.img, { <- img tiene que llegar codificado
    upload_preset: "Proyecto_Individual", <- carpeta de Cloudinary
  });


Para poder previsualizarla, y transportar su información correctamente, necesitamos que un FileReader() codifique el archivo a base64. Una vez introducida la imagen al input, la tomamos de la posición 0 de los archivos del input, a travez del target del evento.
Una vez codificado el archivo, le pedimos que setee un estado local donde vamos a guardar la previsualización

  const handlerImgPreview = (e) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.onloadend = () => {
          setImgPreview(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };


Faltantes que iré agregando:
 - modificar y eliminar juego de la base de datos, junto el cambio o eliminación de imagen en cloudinary.
 - agregar loader
 - ordenar y modularizar correctamente las rutas del back (sin romper nada)
