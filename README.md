### Requisitos para la Prueba Técnica de Desarrollo con Quasar y Directus

#### Objetivo
El objetivo de esta prueba técnica es evaluar tus habilidades en el desarrollo de aplicaciones usando VueJs con la librería Quasar, junto con la configuración y uso de Directus para la gestión de contenidos y la autenticación con Firebase. La prueba debe completarse en un tiempo estimado de entre 4 y 8 horas.

#### Instrucciones

1. **Configuración del Entorno de Desarrollo**
   - **VueJs y Quasar**: Debes crear una aplicación utilizando VueJs con la librería Quasar. La aplicación debe ser capaz de compilarse tanto para PWA (Progressive Web App) como para Capacitor (aplicaciones móviles).
   - **Directus**: Configura una instancia local de Directus para gestionar los contenidos. La base de datos de Directus debe ser levantada utilizando Docker Compose.
   - **Firebase Authentication**: Implementa la autenticación de usuarios utilizando Firebase.

2. **Modelado de Contenidos en Directus**
   - Debes modelar una colección de "Publicaciones" en Directus. Cada publicación debe tener al menos los siguientes campos:
     - **Título** (Texto)
     - **Contenido** (Texto largo)
     - **Autor** (Relación con la colección de usuarios)
     - **Fecha de publicación** (Fecha y hora)
     - **Imagen** (Archivo, opcional)
     - **Likes** (Número, opcional)

3. **Consumo de la API de Directus**
   - Configura la API de Directus para que pueda ser consumida desde la aplicación VueJs.
   - Implementa en la aplicación una funcionalidad que muestre un listado de publicaciones, similar a un feed de una red social.

4. **Autenticación de Usuarios**
   - Configura la autenticación con Firebase de manera que los usuarios puedan registrarse, iniciar sesión y cerrar sesión.
   - Asegúrate de que solo los usuarios autenticados puedan ver el listado de publicaciones.

5. **Interfaz de Usuario**
   - La interfaz debe ser amigable y responsive. Usa los componentes de Quasar para asegurar una buena experiencia de usuario tanto en web como en dispositivos móviles.
   - El feed de publicaciones debe mostrar la información de cada publicación claramente, incluyendo el título, el contenido, el autor y la fecha de publicación. Si hay una imagen asociada, esta también debe mostrarse.
  
6. **Infraestructura y contenidos**
   - No es necesario desplegar el proyecto
   - Se sugiere utilizar Firebase storage para alojar las imágenes, no obstante, para reducir algo el tiempo de desarrollo, es posible utilizar imagenes alojadas en internet

#### Entrega
- **Repositorio**: Clonar este repositorio, la rama quasar-directus contiene estas instrucciones. Sube el repositorio clonado a tu github y compartelo conmigo (o hazlo público). Incluye un archivo README con las instrucciones para levantar el proyecto y cualquier otra información relevante.
- **Documentación**: Documenta el proceso de configuración del entorno, las decisiones tomadas durante el desarrollo y cualquier problema encontrado y su solución.

#### Evaluación
La prueba será evaluada en base a los siguientes criterios:
- **Correctitud técnica**: Que la aplicación funcione según los requisitos especificados.
- **Calidad del código**: Limpieza y organización del código.
- **Interfaz de usuario**: Calidad y usabilidad de la interfaz.
- **Documentación**: Claridad y detalle de la documentación proporcionada.

#### Recursos Adicionales
- **VueJs**: [Documentación oficial de VueJs](https://vuejs.org/)
- **Quasar Framework**: [Documentación de Quasar](https://quasar.dev/)
- **Directus**: [Documentación de Directus](https://docs.directus.io/)
- **Docker Compose**: [Documentación de Docker Compose](https://docs.docker.com/compose/)
- **Firebase Authentication**: [Documentación de Firebase Authentication](https://firebase.google.com/docs/auth)

Buena suerte y happy coding!
