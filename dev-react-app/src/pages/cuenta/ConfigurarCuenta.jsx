import { Tarjeta } from "../../components/Tarjeta";
import { Boton } from "../../components/Boton";
import { useAuth } from "../../context/AuthContext";
import SwitchModoOscuro from "../../components/SwitchModoOscuro";

export function ConfigurarCuenta() {
    const { logout } = useAuth();

    return (<>
        <div className="container my-4">
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
        <div></div>
    </>);
}