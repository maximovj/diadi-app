// Componentes
import { Link } from "react-router-dom";
import { Tarjeta } from "../Tarjeta";

// Servicio para manejar rutas 
import { Rutas } from "../../routes/routes";

// Modulo moment para manejar fechas 
import moment from "moment";
import 'moment/locale/es-mx';

export function TarjetaTarea({ itemTarea }) {
    return (<div className="col-12 col-lg-4 mb-4" key={itemTarea.id}>
        <Tarjeta className={`card-dark-mode w-100 h-100`}>
            <div className="card-body">
                <h5>{itemTarea.titulo}</h5>
                {itemTarea.descripcion}
                <hr className="dropdown-divider" />
                <h6>
                    <span className="badge bg-success">{itemTarea.estado}</span> &nbsp;
                    <span className="badge bg-warning">{itemTarea.importancia}</span>
                </h6>
                <div><small className="text-muted" style={{ fontSize: '9px' }}>{moment(itemTarea.fecha_inicio).format('LL')} - {moment(itemTarea.fecha_limite).format('LL')}</small></div>
            </div>
            <div className="card-footer">
                <div className="d-flex align-content-center justify-content-between">
                    <small className="text-muted">
                        {moment(itemTarea.createdAt).fromNow()}
                    </small>
                    <Link
                        to={{
                            pathname: `${Rutas.TAREAS_EDITAR}`,
                            search: `?id=${itemTarea.id}`
                        }}
                    >
                        <i className="la la-pencil-square-o"></i>
                    </Link>
                </div>
            </div>
        </Tarjeta>
    </div>);
}