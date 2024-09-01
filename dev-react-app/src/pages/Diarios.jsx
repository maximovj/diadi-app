import React, { useState, useEffect } from "react";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { crearDiario, listarDiario } from "../services/service_diario";

import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

export function Diarios() {
  const [notas, setNotas] = useState([]);
  const [textoNota, setTextoNota] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    const fetchDiarios = async () => {
      try {
        const response = await listarDiario(1);
        setNotas(response.data);
        console.log(response.data);
      } catch (err) {
        if (err.response) {
          logout();
          //console.log('Código de estado:', err.response.status);
          //console.log('Error de respuesta del servidor:', err.response.data);
        }
      }
    }

    fetchDiarios();
  }, []);

  const manejarCambio = (e) => {
    setTextoNota(e.target.value);
  };

  const agregarNota = async () => {
    if (textoNota.trim()) {
      try {
        const response = await crearDiario({
          titulo: "Diario",
          contenido: textoNota,
        });
        setTextoNota("");
        setNotas([...notas, response.data]);
        toast.success("Dario registrado correctamente.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        //console.log('nuevo diario registrado.')
      } catch (err) {
        if (err.response) {
          //console.log('agregarNota - Código de estado:', err.response.status);
          //console.log('agregarNota - Error de respuesta del servidor:', err.response.data);
          logout();
        }
      }
    }
  };

  return (
    <>
      <div className="container my-4">
        <section className="mb-4">
          <h1>Agregar Diario</h1>
          <textarea
            value={textoNota}
            onChange={manejarCambio}
            placeholder="Escribir..."
            className="form-control mb-3"
          />
          <Boton tipo="primary" onClick={agregarNota}>
            Agregar
          </Boton>
        </section>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {notas.map((diario, index) => (
            <div className="col" key={index}>
              <Tarjeta className={`m-auto card-dark-mode h-100`}>
                <div className="card-body">
                  <h5 className="card-title">{diario.titulo}</h5>
                  <p className="card-text">{diario.contenido}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Agregada el {diario.createdAt}
                  </small>
                </div>
              </Tarjeta>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
