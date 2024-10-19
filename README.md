<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción

[Nest](https://github.com/nestjs/nest) framework TypeScript test project for report generation.

## Requisitos
##### NodeJS
NodeJS es un entorno de ejecución para JavaScript construido sobre el motor V8 de Google Chrome. Es necesario para ejecutar aplicaciones de JavaScript en el servidor.
- https://nodejs.org/en/download/package-manager
- https://wiki.archlinux.org/title/Node.js
```bash
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
# download and install Node.js (you may need to restart the terminal)
nvm install 20
# verifies the right Node.js version is in the environment
node -v # should print `v20.18.0`
# verifies the right npm version is in the environment
npm -v # should print `10.8.2`
```

##### Docker Desktop
La base de datos PostgreSQL se ejecutará en un contenedor Docker. Docker es una plataforma de código abierto que facilita la creación, implementación y ejecución de aplicaciones en contenedores.
- https://www.docker.com/products/docker-desktop/
- https://docs.docker.com/get-docker/
```bash
# installs Docker Desktop
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
# verifies Docker is installed
docker --version # should print `Docker version 20.10.7, build f0df350`
```

##### NestJS CLI
NestJS CLI es una herramienta de línea de comandos que facilita la creación de aplicaciones NestJS.
- https://docs.nestjs.com/cli/overview
```bash
# installs NestJS CLI
sudo npm i -g @nestjs/cli
# verifies NestJS CLI is installed
nest --version # should print `8.0.0`
```

##### Insomnia (opcional)
Insomnia es una herramienta de prueba de API que facilita la creación y ejecución de solicitudes HTTP.
- https://insomnia.rest/download
```
# installs Insomnia
sudo snap install insomnia
```

##### Imágenes Docker de PostgreSQL y PgAdmin (opcional)
Las imágenes Docker de PostgreSQL y PgAdmin se utilizarán para ejecutar la base de datos y la interfaz de administración de la base de datos.
- https://hub.docker.com/_/postgres
- https://hub.docker.com/r/dpage/pgadmin4
```bash
    # pulls the PostgreSQL image
    docker pull postgres
    # pulls the PgAdmin image
    docker pull dpage/pgadmin4
```

##### Extensiones de Visual Studio Code (opcional)
- Paste JSON as Code
- DotENV
- Backticks
- GitHub Copilot

## Configuración del Proyecto
Este documento detalla los pasos necesarios para configurar el entorno de desarrollo.

#### Crear un Proyecto NestJS

Ejecuta el siguiente comando para crear un proyecto NestJS:
```bash
$ nest new report-server
````

Selecciona `npm` como el gestor de paquetes. Una vez creado el proyecto, navega a la carpeta del proyecto e inicia el servidor:

```bash
$ cd report-server
$ npm run start:dev
```

#### Conectar Insomnia al Servidor (Opcional)


1.  Crea un nuevo proyecto en Insomnia.
2.  Añade una nueva colección de solicitudes.

#### Probar la Conexión del Servidor
Prueba la conexión usando:
```bash
$ curl http://localhost:3000
```
Respuesta esperada:

```bash
{"message":"Hello World!"}
```

#### Eliminar Archivos Innecesarios

Elimina los siguientes archivos:
*   `src/app.controller.spec.ts`
*   `src/app.controller.ts`
*   `src/app.service.ts`

Edita `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';

@Module({
  imports: [],
})
export class AppModule {}
```

#### Docker Compose

Crea un `docker-compose.yml` en la raíz del proyecto:

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

Crea un `config_local.py` en el directorio `pgadmin`:

```python
import os
SESSION_DB_PATH = '/pgadmin_sessions'
```

Ejecuta Docker Compose:

```bash
$ docker-compose up
```

#### Iniciar sesión en pgAdmin

Abre `http://localhost:8080` e inicia sesión con:

*   Email: `superman@google.com`
*   Password: `123456`

#### Configuración del Servidor
Crea una nueva conexión en pgAdmin:

*   Name: `report-server`
*   Hostname: `postgres_database`
*   Port: `5432`
*   Username: `postgres`
*   Password: `123456`

Crea la base de datos `report-server` y ejecuta las consultas ubicadas en la carpeta `queries`.

#### Conectar NestJS a la Base de Datos con Prisma


Instala Prisma:

```bash
$ npx prisma init
```

Edita el archivo `.env`:

```makefile
DATABASE_URL="postgresql://postgres:123456@localhost:5432/postgres"
```

Instala Prisma Client:

```bash
$ npm install @prisma/client
```

#### Prueba la Conexión

Genera el cliente Prisma:

```bash
$ nest g resource basic-reports --no-spec
```

En `src/basic-reports/basic-reports.controller.ts`, agrega este método (no olvides importar Get en la parte superior del archivo):

```typescript
  @Get()
  async hello() {
    return await this.basicReportsService.hello();
  }
```

En `src/basic-reports/basic-reports.service.ts`, agrega este método a la clase `BasicReportsService`:

```typescript
  async hello() {
    return 'Hello from BasicReportsService!';
  }
```

Prueba la conexión con la base de datos:

```bash
$ curl http://localhost:3000/basic-reports
```

Si la conexión es exitosa, deberías obtener este mensaje:

```bash
Hello from BasicReportsService!
```

#### Implementar Prisma en el Servicio

En `src/basic-reports/basic-reports.service.ts`, modifica la clase para usar Prisma:

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
Ejecuta el siguiente comando de Prisma para construir el esquema de la base de datos:

```bash
$ npx prisma db pull
$ npx prisma generate
```

#### Prueba la Conexión con Prisma

```bash
$ curl http://localhost:3000/basic-reports
```