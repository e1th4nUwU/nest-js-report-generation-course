# Requerimientos de instalación para NestJS
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