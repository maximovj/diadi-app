// Hooks
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

// Servicios
import { serviceUsuarioActualizar, servicioUsuarioEliminar } from "../../services/service_usuario";

// Componentes
import { Tarjeta } from "../../components/Tarjeta";
import { Boton } from "../../components/Boton";
import { Contenedor } from "../../components/Contenedor";
import SwitchModoOscuro from "../../components/SwitchModoOscuro";

// Modulo de notificaciones toast
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modulo para manejar alertas y caja modal 
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Variables globales (Siempre va al final)
const mySwal = withReactContent(Swal);

// Componente funcional
export function ConfigurarCuenta() {
    const { logout } = useAuth();
    const [fields, setFields] = useState({
        contrasena_actual: '',
        contrasena_nueva: '',
        repetir_contrasena_nueva: '',
    });

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

    const handleChangePasswd = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmitChangePassword = () => {
        if (!fields.contrasena_actual || !fields.contrasena_nueva || !fields.repetir_contrasena_nueva) {
            showToast('Verifica que los campos sean correctos.', 'error');
            return;
        }

        if (fields.contrasena_nueva !== fields.repetir_contrasena_nueva) {
            showToast('Las contraseñas no condicen.', 'error');
            return;
        }

        serviceUsuarioActualizar(fields)
            .then((response) => {
                if (response.data?.success) {
                    showToast(response.data.ctx_contenido, 'success');
                    setFields({
                        contrasena_actual: '',
                        contrasena_nueva: '',
                        repetir_contrasena_nueva: '',
                    });
                }
            })
            .catch((err) => {
                if (err.response.status !== 500) {
                    showToast(err.response.data.ctx_contenido || err.response.statusText, 'error');
                } else {
                    logout();
                }
            });
    }

    const handleBtnEliminarCuenta = () => {
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
                servicioUsuarioEliminar()
                    .then((response) => {
                        if (response.data?.success) {
                            showToast(response.data.ctx_contenido, 'success');
                            setTimeout(() => {
                                logout();
                            }, 1000);
                        }
                    })
                    .catch(() => {
                        logout();
                    })
            }
        });
    };

    return (<>
        <Contenedor>
            <div className="col-12 col-lg-6">
                <Tarjeta className={`card-dark-mode w-100 h-100 mb-4`}>
                    <div className="card-header">
                        <h1 className="txt-h1-css">Cambiar contraseña</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="contrasena_actual" className="form-label">
                                Contraseña actual
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="contrasena_actual"
                                name="contrasena_actual"
                                onChange={handleChangePasswd}
                                value={fields.contrasena_actual}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contrasena_nueva" className="form-label">
                                Contraseña nueva
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="contrasena_nueva"
                                name="contrasena_nueva"
                                onChange={handleChangePasswd}
                                value={fields.contrasena_nueva}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="repetir_contrasena_nueva" className="form-label">
                                Repetir contraseña nueva
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="repetir_contrasena_nueva"
                                name="repetir_contrasena_nueva"
                                onChange={handleChangePasswd}
                                value={fields.repetir_contrasena_nueva}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-between align-items-start">
                            <Boton type={'success'} size={'sm'} onClick={handleSubmitChangePassword}>
                                <i className="la la-check-circle-o" /> Cambiar contraseña
                            </Boton>
                        </div>
                    </div>
                </Tarjeta>
                <Tarjeta className={`card-dark-mode w-100 h-100 mb-4`}>
                    <div className="card-header">
                        <h1 className="txt-h1-css">Configurar modo oscuro</h1>
                    </div>
                    <div className="card-body">
                        <div>
                            <p>Activar modo oscuro</p>
                            <SwitchModoOscuro></SwitchModoOscuro>
                        </div>
                    </div>
                </Tarjeta>
                <Tarjeta className={`card-dark-mode w-100 h-100 mb-4`}>
                    <div className="card-header">
                        <h1 className="txt-h1-css">Configurar cuenta</h1>
                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-row gap-4  justify-content-start">
                            <div>
                                <Boton type={'danger'} size={'sm'} onClick={logout}>
                                    <i className="la la-sign-out" /> Cerrar sesión
                                </Boton>
                            </div>
                            <div>
                                <Boton type={'danger'} size={'sm'} onClick={handleBtnEliminarCuenta}>
                                    <i className="la la-trash-restore" /> Eliminar cuenta
                                </Boton>
                            </div>
                        </div>
                    </div>
                </Tarjeta>
            </div>
        </Contenedor>
        <ToastContainer />
    </>);
}