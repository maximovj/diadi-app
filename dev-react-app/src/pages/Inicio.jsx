import { Contenedor } from '../components/Contenedor';

export function Inicio() {
  return (
    <Contenedor alignItems='align-items-stretch'>
      <div className="alert alert-warning h-100 w-100" role="alert">
        <h4 className="alert-heading">Bienvenido a DiadiApp</h4>
        <p>Regístrate a DiadiApp</p>
        <hr />
      </div>

      <div className="card mb-3">
        <img src="/preview/image_1.png" className='car-img-top' loading='lazy' alt="Descripción de la imagen" />
        <div className="card-body">
          <h5 className="card-title">Tareas</h5>
          <p className="card-text">Empieza a ordenar tus tareas y/o actividades</p>
          <a href="/tareas" role='button' className='btn btn-sm btn-success'>Mis tareas</a>
        </div>
      </div>

      <div className="card mb-3">
        <img src="/preview/image_2.png" className='car-img-top' loading='lazy' alt="Descripción de la imagen" />
        <div className="card-body">
          <h5 className="card-title">Lista de diarios</h5>
          <p className="card-text">Empieza a registrar tus momentos felices con un diario.</p>
          <a href="/diarios" role='button' className='btn btn-sm btn-success'>Mis diarios</a>
        </div>
      </div>
    </Contenedor>
  );
}