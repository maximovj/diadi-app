// Hooks react
import React, { useState, useEffect } from "react";

// Contexto 
import { useAuth } from '../context/AuthContext';

// Componentes
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { crearDiario, listarDiario } from "../services/service_diario";
import { ModalCrear } from "../components/diario/ModalCrear";

// Modulo de notificación toast
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modulo moment para manejar fechas 
import moment from "moment";

export function Diarios() {
  // Crear estados
  const [showModal, setShowModal] = useState(false);
  const [diarios, setDiarios] = useState([]);
  const [diario, setDiario] = useState({
    titulo: '',
    contenido: '',
  });

  const { logout } = useAuth();

  useEffect(() => {
    const fetchDiarios = async () => {
      try {
        const response = await listarDiario(1);
        setDiarios(response.data);
        console.log(response.data);
      } catch (err) {
        if (err.response) {
          logout();
        }
      }
    }

    fetchDiarios();
  }, []);

  // Mostrar notificaciones de toast
  const showToast = (message, type) => {
    toast[type](message, {
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
  };

  const handleOnCloseModal = () => {
    setShowModal(false);
  };

  const handleOnOpenModal = () => {
    setShowModal(true);
  }

  const handleOnSubmit = async () => {
    if (!diario.titulo || !diario.contenido) {
      showToast('Verifique que los campos sean correctos.', 'error');
      return;
    }

    try {
      const response = await crearDiario(diario);

      if (response.data) {
        setDiarios([...diarios, response.data.data]);
        showToast(response.data.ctx_contenido, 'success');
        setDiario({
          titulo: '',
          contenido: '',
        });
        handleOnCloseModal();
      }

    } catch (err) {
      if (err.response) {
        logout();
      }
    }
  };

  const handleOnChangeFieldInput = (e) => {
    setDiario({
      ...diario,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Lista de diarios</h2>
          <Boton tipo={`primary`} onClick={handleOnOpenModal}>
            + Nuevo diario
          </Boton>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
          {diarios.map((diario, index) => (
            <div className="col" key={index}>
              <Tarjeta className={`m-auto card-dark-mode h-100`}>
                <div className="card-body">
                  <h5 className="card-title">{diario.titulo}</h5>
                  <p className="card-text">{diario.contenido}</p>
                  <hr className="dropdown-divider" />
                  <div><small className="text-muted" style={{ fontSize: '9px' }}>{moment(diario.createdAt).format('LL')}</small></div>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    {moment(diario.createdAt).fromNow()}
                  </small>
                </div>
              </Tarjeta>
            </div>
          ))}
        </div>
      </div>

      <ModalCrear
        show={showModal}
        handleClose={handleOnCloseModal}
        handleSubmit={handleOnSubmit}
        handleChange={handleOnChangeFieldInput}
        tituloModal={'Nuevo diario'}
        diario={diario}
      />

      <ToastContainer />
    </>
  );
}
