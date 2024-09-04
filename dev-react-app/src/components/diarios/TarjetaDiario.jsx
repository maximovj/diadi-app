// Componentes
import { Link } from "react-router-dom";
import { Tarjeta } from "../Tarjeta";

// Servicio para manejar rutas 
import { Rutas } from "../../routes/routes";

// Modulo moment para manejar fechas 
import moment from "moment";
import 'moment/locale/es-mx';


export function TarjetaDiario({ diario }) {
    return (<div className="col-12 col-lg-4 mb-4" key={diario.id}>
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
    </div>);
}