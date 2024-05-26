import React, { useState } from "react";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { crearDiario } from "../services/service_diario";

export function Diarios() {
  const [notas, setNotas] = useState([]);
  const [textoNota, setTextoNota] = useState("");

  const manejarCambio = (e) => {
    setTextoNota(e.target.value);
  };

  const agregarNota = async () => {
    if (textoNota.trim()) {
      try {
        await crearDiario({
          titulo: "Diario",
          contenido: textoNota,
          usuario_id: 1,
        });
        setTextoNota("");
        //console.log('nuevo diario registrado.')
      } catch (err) {
        if (err.response) {
          //console.log('Código de estado:', err.response.status);
          //console.log('Error de respuesta del servidor:', err.response.data);
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
          {notas.map((nota, index) => (
            <div className="col" key={index}>
              <Tarjeta className={`m-auto card-dark-mode h-100`}>
                <div className="card-body">
                  <h5 className="card-title">Nota {index + 1}</h5>
                  <p className="card-text">{nota.texto}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Agregada el {nota.timestamp}
                  </small>
                </div>
              </Tarjeta>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
