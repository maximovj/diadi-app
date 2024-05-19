import React, { useState } from 'react';

export function Diarios() {
  const [notas, setNotas] = useState([]);
  const [textoNota, setTextoNota] = useState('');

  const manejarCambio = (e) => {
    setTextoNota(e.target.value);
  };

  const agregarNota = () => {
    if (textoNota.trim()) {
      const nuevaNota = {
        texto: textoNota,
        timestamp: new Date().toLocaleString()
      };
      setNotas([...notas, nuevaNota]);
      setTextoNota('');
    }
  };

  return (
    <>
      <div className="container my-4">
        <h1>Agregar Diario</h1>
        <textarea
          value={textoNota}
          onChange={manejarCambio}
          placeholder="Escribir..."
          className="form-control mb-3"
        />
        <button onClick={agregarNota} className="btn btn-primary mb-3">
          Agregar
        </button>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {notas.map((nota, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Nota {index + 1}</h5>
                  <p className="card-text">{nota.texto}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Agregada el {nota.timestamp}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
