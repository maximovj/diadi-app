// Hooks de reactjs
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Servicios 
import { serviceTareaVer, serviceTareaActualizar, serviceTareaEliminar } from "../../services/service_tarea";

// Contexto 
import { useAuth } from "../../context/AuthContext";

// Componentes 
import { Tarjeta } from "../../components/Tarjeta";
import { Boton } from "../../components/Boton";
import { Contenedor } from "../../components/Contenedor";

// Modulo para notificaciones con toastify
import { toast, Bounce, ToastContainer } from 'react-toastify';

// Modulo para manejar fechas 
import moment from "moment";
import 'moment/locale/es-mx';

// Modulo para manejar alertas y caja modal 
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Hooks personalizado (Siempre se va al final)
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

// Variables globales (Siempre se va al final)
const mySwal = withReactContent(Swal);

// Componente funcional
export function EditarTarea() {
    const { logout } = useAuth();
    const [tarea, setTarea] = useState({});
    const navigate = useNavigate();
    const query = useQuery();
    const id = query.get('id');

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
    }

    const handleOnChangeFieldInput = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        serviceTareaVer(id)
            .then(response => {
                if (response.data?.success) {
                    setTarea(response.data.data);
                }
            })
            .catch(() => { logout(); });
    }, [id, logout]);

    const handleBtnActualizar = () => {
        serviceTareaActualizar(tarea, id)
            .then(response => {
                if (response.data?.success) {
                    showToast(response.data.ctx_contenido, 'success');
                }
            })
            .catch(() => { logout(); });
    }

    const handleBtnEliminar = () => {
        mySwal.fire({
            icon: 'question',
            title: '¿Estás seguro?',
            html: 'No podrás revertir esto',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'No, cancelarlo',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                serviceTareaEliminar(id)
                    .then(response => {
                        if (response.data?.success) {
                            showToast(response.data.ctx_contenido, 'success');
                            setTimeout(() => {
                                navigate('/tareas')
                            }, 1000);
                        }
                    })
                    .catch(() => { logout(); });
            }
        });
    }

    return (<>
        <Contenedor>
            <div className="col-12 col-lg-6 mx-auto">
                <Tarjeta className={'w-100 h-100'}>
                    <div className="card-body">
                        <div className="mb-4">
                            <label htmlFor="titulo" className="form-label">Título</label>
                            <input
                                className="form-control"
                                placeholder="Escribe el título"
                                type="text"
                                id="titulo"
                                name="titulo"
                                onChange={handleOnChangeFieldInput}
                                value={tarea.titulo}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                            <input
                                className="form-control"
                                placeholder="Escribe la descripción"
                                type="text"
                                id="descripcion"
                                name="descripcion"
                                onChange={handleOnChangeFieldInput}
                                value={tarea.descripcion}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <select
                                className="form-select"
                                id="estado"
                                name="estado"
                                onChange={handleOnChangeFieldInput}
                                value={tarea.estado}>
                                <option value="pendiente">Pendiente</option>
                                <option value="en_progreso">En progreso</option>
                                <option value="finalizado">Finalizado</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="importancia">Estado</label>
                            <select
                                className="form-select"
                                name="importancia"
                                id="importancia"
                                onChange={handleOnChangeFieldInput}
                                value={tarea.importancia}>
                                <option value="baja">Baja</option>
                                <option value="normal">Normal</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="fecha_inicio" className="form-label">Fecha de Inicio</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="fecha_inicio"
                                    name="fecha_inicio"
                                    onChange={handleOnChangeFieldInput}
                                    value={moment(tarea.fecha_inicio).format('YYYY-MM-DD')}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="fecha_limite" className="form-label">Fecha Límite</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="fecha_limite"
                                    name="fecha_limite"
                                    onChange={handleOnChangeFieldInput}
                                    value={moment(tarea.fecha_limite).format('YYYY-MM-DD')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex gap-2">
                            <Boton size={'sm'} type={'success'} onClick={handleBtnActualizar} >
                                <i className="la la-check-circle-o" /> Actualizar
                            </Boton>
                            <Boton size={'sm'} type={'danger'} onClick={handleBtnEliminar}>
                                <i className="la la-trash-o" /> Eliminar
                            </Boton>
                        </div>
                    </div>
                </Tarjeta>
            </div>
        </Contenedor>
        <ToastContainer />
    </>);
}