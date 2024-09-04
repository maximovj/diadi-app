# DiadiApp v1.0Beta

Este repositorio contiene un proyecto con arquitectura "frontend y backend desacoplados.

React JS + Axios + Bootstrap 5 para el FrontEnd.

Node JS + Express + Sequelize + MySQL para el BackEnd.

# Backend (NodeJs + MySQL + Sequelize)

El servicio API incluye EndPoint para usuarios, diarios, tareas, auth (autenticación), así también implementa Sequelize como ORM para manipular la base de datos de MYSQL. 

Se implementa encriptación de contraseña para usuarios.

Se implementa CORS para consultas de origin permitidos.

Se implementa JSON Web Token para generar token de autenticación.

Se usa dotenv para definir variables de entorno.

Se usa nodemon para monitorear consultas en los EndPoint.

## Dependencias

* nodemon ^3.1.0
* express ^4.19.2
* sequelize ^6.37.3
* bcryptjs ^2.4.3
* body-parser ^1.20.2
* cors ^2.8.5
* dotenv ^16.4.5
* jsonwebtoken ^9.0.2
* mysql2 ^3.9.7
* sequelize ^6.37.3

# Servicio API (BackEnd)

## Pasos para ejecutar el servicio API

Para arrancar el servicio de BackEnd siga los siguientes pasos:


* Paso 1)

Antes de seguir los pasos asegúrese de crear una base de datos llamado `db_diadiapp` en una base de datos de MySQL.

* Paso 2)

Accede a la carpeta del servicio API usando el sig. comando desde la terminal:

```shell
$ cd ./api-express
```

* Paso 3)

Crear una copia del archivo `.env.example` con nombre `.env` para establecer variables de entorno


* Paso 4)

Ejecutar el sig. comando para descargar dependencias de NodeJS

```shell
$ npm install
```

* Paso 5)

Ejecutar el sig. comando para correr el servicio API

```shell
$ npm run dev
```