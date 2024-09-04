# DiadiApp v1.0Beta

Este repositorio contiene un proyecto con arquitectura "frontend y backend desacoplados.

React JS + Axios + Bootstrap 5 para el FrontEnd.

Node JS + Express + Sequelize + MySQL para el BackEnd.

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