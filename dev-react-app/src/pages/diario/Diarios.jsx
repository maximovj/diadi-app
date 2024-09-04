// Hooks react
import React, { useState, useEffect } from "react";

// Contexto 
import { useAuth } from '../../context/AuthContext';

// Componentes
import { Boton } from "../../components/Boton";
import { ModalCrear } from "../../components/diario/ModalCrear";
import { Contenedor } from "../../components/Contenedor";
import { TarjetaDiario } from "../../components/diario/TarjetaDiario";

// Servicios 
import { serviceDiarioCrear, serviceDiarioListar } from "../../services/service_diario";

// Modulo de notificación toast
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SinDiarios } from "../../components/diario/SinDiarios";

export function Diarios() {
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [diarios, setDiarios] = useState([]);
  const [diario, setDiario] = useState({
    titulo: '',
    contenido: '',
  });



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

  useEffect(() => {
    serviceDiarioListar()
      .then(response => {
        if (response.data?.success) {
          setDiarios(response.data.data);
        }
      })
      .catch(() => {
        logout();
      });
  }, [logout]);

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
      const response = await serviceDiarioCrear(diario);

      if (response.data) {
        const response_data = response.data;
        setDiarios([...diarios, response_data.data]);
        showToast(response_data.ctx_contenido, 'success');
        setDiario({
          titulo: '',
          contenido: '',
        });
        handleOnCloseModal();
      }

    } catch (err) {
      logout();
    }
  };

  const handleOnChangeFieldInput = (e) => {
    setDiario({
      ...diario,
      [e.target.name]: e.target.value,
    });
  };

  const renderizarDiarios = () => {
    if (diarios.length <= 0) {
      return <SinDiarios />;
    } else {
      return diarios.map((diario, index) => (
        <TarjetaDiario key={`${diario.id + Date.now()}`} diario={diario} />
      ));
    }
  }

  return (
    <>
      <Contenedor alignItems="align-items-stretch">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Lista de diarios</h2>
            <Boton tipo={`primary`} onClick={handleOnOpenModal}>
              + Nuevo diario
            </Boton>
          </div>
          <div className="row mt-4 g-2">
            {renderizarDiarios()}
          </div>
        </div>
      </Contenedor>

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
