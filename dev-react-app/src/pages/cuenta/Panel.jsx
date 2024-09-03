import { Contenedor } from "../../components/Contenedor";

export function Panel() {
    return (
        <Contenedor>
            <div className="alert alert-info h-100 w-100" role="alert">
                <h4 className="alert-heading">Bienvenido a DiadiApp</h4>
                <hr />
                <p className="mb-0">Este es el panel principal</p>
            </div>
            <div className="alert alert-warning h-100 w-100" role="alert">
                <div className="mb-4">
                    <p><b>Acceda al panel de tareas.</b></p>
                    <ul>
                        <li>Consulta tus tareas.</li>
                        <li>Empieza a ordenar tus tareas y/o actividades.</li>
                    </ul>
                </div>
                <div className="mb-4">
                    <p><b>Acceda al panel de diarios.</b></p>
                    <ul>
                        <li>Consulta tus diarios.</li>
                        <li>Empieza a registrar tus momentos felices con un diario..</li>
                    </ul>
                </div>
            </div>
        </Contenedor>
    );
}