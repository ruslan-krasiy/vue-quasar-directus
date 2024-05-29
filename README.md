# PAW Test project

## 1. Introduction

This project is based on Quasar Framework + Vue and contains
the `frontend` , `uploads`, `proxy`, `extensions` folders.
   - The `frontend` folder is a Quasar Framework + Vue3, which contains the reactive web interface.
   - The `uploads`& `extensions` folders needs for Directus upload files and extensions
   - The `proxy` folder is Nginx default configuration

We use Dockerized environments for development and production environments.

### 1.1 Directory tree

- **_frontend_** Quasar Framework + VUE3
   - **_public_** - Contains static files and templates
   - **_src_** - Contains all the code to generate the web interface
- **_uploads_** - Directus uploads
- **_extensions_** - Directus extensions
- **_proxy_** - Contains configuration of the reverse proxy used for the <u>development environment</u> 
- **_screenshot_** - Screenshots of images used in README.md
&nbsp;

----

&nbsp;

## 2. Development environment

We use a dockerised environment via docker-compose.

This allows us to work in a very production-like environment.

Advantages:

- No access to the frontend and backend through ports exposed by your own code servers.
- From the beginning we use secure HTTPs and WSS protocols.

Services:

- _proxy_: Nginx server that allows us to use http and access services.
- _frontend_: Quasar Framework for local development. (Accessible through: http://localhost/)
- _database_: Postgres.
- _database_manager_: Direcus. (Accessible through: http://localhost:8055/admin/login)
- _user-authentification_ - FireBase Authentification
- _image-storage_ - FireBase storage


### 2.1. Start complete environment in development mode

- **Option 1** - Showing the logs of all modules:

  ```bash
  $ cd technical-tests
  $ docker-compose up
  ```

- **Option 2** - Detached mode: 
  - Note: Run containers in the background, print new container names.

  ```bash
  $ cd technical-tests
  $ docker-compose up -d
  ```

  - Tips:
    - When you finish your workday, run `docker-compose down`.
    - If you modify the contents of the .env file, to apply your changes, simply run `docker-compose up -d`. 

Now you can access:

- Frontend: https://localhost

    ![frontend](screenshots/front-end.png)
- API endpoint
    ![API](screenshots/api-call.png)

- Direcus
    ![backend](screenshots/directus.png)

## Direcus panel

### How get API-KEY


#### 1. Create an collection

Access to `Settings>Data Model` and press `+`.
Write `publications` in the `Name` input, and choose `Generated UUID` for ID. Than add fields into collection.

- **_date_created_** - Date ( auto-insert )
- **_title_** - Publication title ( required, string )
- **_content_** - Publication content ( required, string ) 
- **_autor_** - Autor ( required, string )
- **_image_** - Image name file ( string )
- **_likes_** - List of user's ID ( tags )

#### 2. Create a role

Access to `Settings>Access Control` and press `+`.
In appiered modal set new role `WebApi` (or any name which you like) and press `Save`.

Then allow acces to created previosly `collection`. 
![backend](screenshots/role-permissions.png)

#### 3. Create a user

Access to `User Directory` and press `+`.
Set First Name: `API` and in Last Name: `V1`, scroll down to the `Admin Options` section and in the Token input press `+` for generate a key. Copy that key and press `Save`. 

The key that you have been copied, you should paste as a value for API_Key in `/frontend/.env` file.


Now restart your docker containers:
  ```bash
  $ docker-compose down
  $ docker-compose up -d
  ```

## FireBase

Configuration for FireBase is located in `./frontend/src/boot/firebase.ts`.


### Decisions 

When my app was runnig on http://172.21.0.5:9000/ and Directus on http://0.0.0.0:8055 i had an CORS blocking. So i decided use Nginx and run all app with one command line. So I create a `paw-frontend` container for run Quasar Framework and `paw-proxy` for Nginx. 

### Problems

- docker-compose.yml configuration for Directus.
  - Resolved by reading Directus Docs.

- Nginx configuration
  - Resolved

- Configuration Directus Panel
  - Not resolved. After stop containers or shotdown my PC Directus lost all configurations, and data. 
   I made an export files before stop docker containers, but `roles` & `users` still missing. It's provide a problem for generate an API_KEY

- FireBase configuration.
   - Resolved by reading Docs.
- Implement FireBase Auth and FireBase Storage into APP.
   - Resolved by wathing an online course for Quasar where shows how use `boot` and `plugins`. 
- Dificults for using `composable`. Sometimes Vue `watch` doesn't work how I was expected.
- There are problems with update data via Directus because it use cache.
  After reload(F5) a page the data looks like not updated but in BBDD it is.  

## 3. FAQs

&nbsp;

### How to clean the database in local development?

  If we modify the validation scheme of mongo, we will have to clean the DB.

  ```bash
  $ docker-compose down
  $ docker volume rm pgdata
  $ docker-compose up -d
  ```

### How can I see the logs of the modules?

  To list the modules that are running, run: `docker ps`
  
  And to see the logs, we will use the name associated to the docker container, for the case of paw-directus we will run: `docker logs -f --tail 100 paw-directus`



### DB PAnel

http://localhost:8055/admin/login


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
