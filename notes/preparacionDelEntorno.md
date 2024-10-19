# Preparación del entorno del desarrollo
Dentro de este documento se detallan los pasos necesarios para la preparación del entorno de desarrollo.

### Creación del proyecto de NestJS
Para la creación del proyecto de NestJS se debe ejecutar el siguiente comando:
```bash
$ nest new <nombre_del_proyecto>
```
Para este proyecto se utilizó el nombre `report-server`.

Dentro de la creación del proyecto se debe seleccionar el manejador de paquetes a utilizar, en este caso se seleccionó `npm`.

Una vez que acabe la creación del proyecto se debe ingresar a la carpeta del proyecto y ejecutar el siguiente comando:
```bash
$ cd report-server
$ npm run start:dev
```


### Conexión de Insomnia con el servidor (opcional, en caso de usar Insomnia)
Para la conexión de Insomnia con el servidor se debe seguir los siguientes pasos:
1. Crear un nuevo proyecto en Insomnia.
2. Crear una nueva request collection.

### Probar la conexión con el servidor
Para probar la conexión con el servidor se debe ejecutar el siguiente comando:
```bash
$ curl http://localhost:3000
```
Si la conexión es exitosa se debe obtener el siguiente mensaje:
```bash
{"message":"Hello World!"}
```

### Eliminar archivos innecesarios
Dentro del proyecto de NestJS se encuentran archivos que no son necesarios para el desarrollo del proyecto, por lo que se deben eliminar. Los archivos que se deben eliminar son:
- `src/app.controller.spec.ts`
- `src/app.controller.ts`
- `src/app.service.ts`
Debemos también eliminar las referencias a estos archivos en el archivo `src/app.module.ts` de tal forma que quede de la siguiente manera:
```typescript
import { Module } from '@nestjs/common';

@Module({
  imports: [],
})
export class AppModule {}
```

### Docker Compose
Nos basamos en este [repositorio](https://gist.github.com/Klerith/0708124a4470aa4721827607effc684a) para la configuración de Docker Compose. Se debe crear un archivo llamado `docker-compose.yml` en la raíz del proyecto de NestJS con el siguiente contenido:
```yaml
services:
  db:
    container_name: postgres_database
    image: postgres:16.3
    volumes:
      - ./postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=123456
    restart: always
    ports:
      - "5432:5432"

  pgAdmin:
    depends_on:
      - db
    image: dpage/pgadmin4:8.6
    volumes:
      - ./pgadmin:/var/lib/pgadmin
      - ./pgadmin/config_local.py:/pgadmin/config_local.py
      - ./pgadmin_sessions:/pgadmin_sessions
    ports:
      - "8080:80" 
    environment:
      - PGADMIN_DEFAULT_PASSWORD=123456
      - PGADMIN_DEFAULT_EMAIL=superman@google.com
    restart: always
```
Debemos de crear un archivo llamado `config_local.py` en la carpeta `pgadmin` con el siguiente contenido:
```python
import os
SESSION_DB_PATH = '/pgadmin_sessions'
```
Finalmente, se debe crear una carpeta llamada `pgadmin` en la raíz del proyecto.

Para ejecutar el contenedor de Docker Compose se debe ejecutar el siguiente comando:
```bash
$ docker-compose up
```


### Iniciar sesión en pgAdmin
Para iniciar sesión en pgAdmin se debe abrir un navegador y acceder a la siguiente dirección:
```
http://localhost:8080
```
Una vez que se abra la página se debe ingresar el correo `superman@google.com` y la contraseña `  `.  


### Configuración del servidor
Dentro de pgAdmin se debe crear una nueva conexión con los siguientes datos:
- Name: `report-server`
- Hostname: `postgres_database`
- Port: `5432`
- Username: `postgres`
- Password: `123456`
Una vez hecho esto, se debe guardar la conexión y se debe crear una nueva base de datos con el nombre `report-server`.

Para crear las tablasde la base de datos ejecutaremos las queries que se encuentran en el directorio `queries` del proyecto.

### Conexión de NestJS con la base de datos mediante Prisma
Prisma es una herramienta que nos permite conectar nuestra aplicación de NestJS con la base de datos. Para instalar Prisma se debe ejecutar el siguiente comando:
```bash
$ npx prisma init
```
Tras instalarlo, debemos modificar el archivo `.env` que se encuentra en la raíz del proyecto con los siguientes datos:
```
DATABASE_URL="postgresql://postgres:123456@localhost:5432/postgres"
```
Crearemos una copia del archivo `.env` y lo renombraremos a `.env.template` para que los demás desarrolladores puedan tener una referencia de cómo debe de estar configurado el archivo `.env`.

Instalaremos también el prisma client con el siguiente comando:
```bash
$ npm install @prisma/client
```

### Pruebas de conexión con la base de datos
Ejecutaremos el siguiente comando para verificar que la conexión con la base de datos es exitosa:
```bash
$ nest g resource basic-reports --no-spec
```
Este comando creará un recurso llamado `basic-reports` en el proyecto de NestJS. Seleccionamos la opción `REST API` sin crear los entry points.

Ahora abrimos el archivo `src/basic-reports/basic-reports.controller.ts` y la siguiente función dentro del controlador (no olvides importar el @Get en la parte superior del archivo):
```typescript
  @Get()
  async hello() {
    return await this.basicReportsService.hello();
  }
```
Vamos al archivo `src/basic-reports/basic-reports.service.ts` y agregamos la siguiente función a la clase `BasicReportsService`:
```typescript
  async hello() {
        return 'Hello from BasicReportsService!';
    }
```
En este punto podemos probar la conexión con la base de datos ejecutando el siguiente comando:
```bash
$ curl http://localhost:3000/basic-reports
```
Si la conexión es exitosa se debe obtener el siguiente mensaje:
```bash
Hello from BasicReportsService!
```

Regresamos a nuestro archivo `src/basic-reports/basic-reports.service.ts` y modificamos la clase para que haga uso de Prisma:
```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        console.log('Connected to the database');
    }

    async hello() {
        return 'Hello from BasicReportsService!';
    }

}
```
Corremos el siguiente comando de Prisma para construir el esquema de la base de datos:
```bash
$ npx prisma db pull
```
Generamos también el cliente de Prisma con el siguiente comando:
```bash
$ npx prisma generate
```
Con esto, ya podemos hacer uso de Prisma en nuestro proyecto de NestJS. Probamos la conexión con la base de datos ejecutando el siguiente comando:
```bash
$ curl http://localhost:3000/basic-reports
```
Si la conexión es exitosa con las base de datos, lo debemos ver en la consola con el mensaje `Connected to the database`.

