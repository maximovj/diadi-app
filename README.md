# DiadiApp v1.0Beta

Este repositorio contiene un proyecto con arquitectura "frontend y backend desacoplados.

React JS + Axios + Bootstrap 5 para el FrontEnd.

Node JS + Express + Sequelize + MySQL para el BackEnd.

# Requisitos

* Node JS => 18.17.x
* MySQL 5.7.43

# Backend (NodeJs + MySQL + Sequelize)

El servicio API incluye EndPoint para usuarios, diarios, tareas, auth (autenticación), así también implementa Sequelize como ORM para manipular la base de datos de MYSQL. 

Se implementa encriptación de contraseña para usuarios.

Se implementa CORS para consultas de origin permitidos.

Se implementa JSON Web Token para generar token de autenticación.

Se usar dotenv para definir variables de entorno.

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

# FrontEnd (ReactJS + Axios + SweetAlert2) 

El servicio SPA incluye módulos como SweetAlert y Toastify, así también implementa Axios para comunicarse con el servicio API. 

## Dependencias

* axios ^1.7.2
* js-cookie ^3.0.5
* moment ^2.30.1
* react ^18.3.1
* react-dom ^18.3.1
* react-router-dom ^6.23.1
* react-scripts 5.0.1
* react-toasty ^10.0.5
* sweetalert2 ^11.12.4
* sweetalert2-react-content ^5.0.7

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

# Servicio SPA (FrontEnd)

## Pasos para ejecutar el servicio SPA

* Paso 1)

Accede a la carpeta del servicio SPA usando el sig. comando desde la terminal:

```shell
$ cd ./dev-react-app
```

* Paso 2)

Crear una copia del archivo `.env.example` con nombre `.env` para establecer variables de entorno.


* Paso 3)

Ejecutar el sig. comando para descargar dependencias de NodeJS.

```shell
$ npm install
```

* Paso 4)

Ejecutar el sig. comando para correr el servicio SPA.

```shell
$ npm start
```

# Vista previa

![preview01.png](/preview/01.png)
![preview02.png](/preview/02.png)
![preview04.png](/preview/04.png)
![preview03.png](/preview/03.png)

# Colaboradoes

Luis Fernando <br>
Boris Parra Lemus <br>
Victor Jesus Maximo Abundio <br>