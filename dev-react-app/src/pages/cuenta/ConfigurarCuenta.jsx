// Hooks
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

// Componentes
import { Tarjeta } from "../../components/Tarjeta";
import { Boton } from "../../components/Boton";
import SwitchModoOscuro from "../../components/SwitchModoOscuro";

// Modulo de notificaciones toast
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Servicios
import { serviceUsuarioActualizar } from "../../services/service_usuario";

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
                if (err.response && err.response.data) {
                    showToast(err.response.data.ctx_contenido, 'error');
                }
            });
    }

    return (<>
        <div className="container my-4">
            <Tarjeta className={`card-dark-mode w-50 m-auto h-100 mb-4`}>
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
                    <div className="d-flex justify-content-between align-items-center">
                        <div></div>
                        <Boton tipo="success" onClick={handleSubmitChangePassword}>Cambiar contraseña</Boton>
                    </div>
                </div>
            </Tarjeta>
            <Tarjeta className={`card-dark-mode w-50 m-auto h-100 mb-4`}>
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
            <Tarjeta className={`card-dark-mode w-50 m-auto h-100 mb-4`}>
                <div className="card-header">
                    <h1 className="txt-h1-css">Configurar cuenta</h1>
                </div>
                <div className="card-body">
                    <div>
                        <h6>Cerrar sesión</h6>
                        <Boton tipo="danger" onClick={logout}>Cerrar sesión</Boton>
                    </div>
                    <hr className="dropdown-divider" />
                    <div>
                        <h6>Eliminar cuenta</h6>
                        <Boton tipo="danger">Eliminar cuenta</Boton>
                    </div>
                </div>
            </Tarjeta>
        </div>
        <ToastContainer />
    </>);
}