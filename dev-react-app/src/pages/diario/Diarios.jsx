// Hooks react
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// Contexto 
import { useAuth } from '../../context/AuthContext';

// Componentes
import { Tarjeta } from "../../components/Tarjeta";
import { Boton } from "../../components/Boton";
import { ModalCrear } from "../../components/diario/ModalCrear";
import { Contenedor } from "../../components/Contenedor";

// Servicios 
import { serviceDiarioCrear, serviceDiarioListar } from "../../services/service_diario";
import { Rutas } from '../../routes/routes';

// Modulo de notificación toast
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modulo moment para manejar fechas 
import moment from "moment";

export function Diarios() {
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [diarios, setDiarios] = useState([]);
  const [diario, setDiario] = useState({
    titulo: '',
    contenido: '',
  });

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
            {diarios.map((diario, index) => (
              <div className="col-12 col-lg-4 mb-4" key={index}>
                <Tarjeta className={`card-dark-mode w-100 h-100`}>
                  <div className="card-body">
                    <h5 className="card-title">{diario.titulo}</h5>
                    <p className="card-text">{diario.contenido}</p>
                    <hr className="dropdown-divider" />
                    <div><small className="text-muted" style={{ fontSize: '9px' }}>{moment(diario.createdAt).format('LL')}</small></div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-content-center align-items-center">
                      <small className="text-muted">
                        {moment(diario.createdAt).fromNow()}
                      </small>
                      <Link
                        to={{
                          pathname: `${Rutas.DIARIOS_EDITAR}`,
                          search: `?id=${diario.id}`
                        }}
                      >
                        <i className="la la-pencil-square-o"></i>
                      </Link>
                    </div>
                  </div>
                </Tarjeta>
              </div>
            ))}
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
