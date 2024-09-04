import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Rutas } from '../routes/routes';

export function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark text-white"
        style={{ backgroundColor: "#363636" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to={Rutas.HOME}>
            <img src="/diadiapp_60x60.png" alt="" width="32" height="32" className="d-inline-block align-text-top" />&nbsp;DiaDiApp
          </Link>
          <span className='text-muted'>v1.0Beta</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">


              {/* Solo se muestra si el usuario ha iniciado sesión  */}
              {isAuthenticated && (
                <>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                      Tareas
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to={Rutas.TAREAS}>Panel</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                      Diarios
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to={Rutas.DIARIOS}>Panel</Link></li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex flex-column justify-content-end align-items-end">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* Solo se muestra cuando el usuario no está autenticado  */}
                {!isAuthenticated && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={Rutas.ACCEDER}>
                        Acceder
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={Rutas.REGISTRARME}>
                        Registrarme
                      </Link>
                    </li>
                  </>
                )}

                {/* Solo se muestra si el usuario ha iniciado sesión  */}
                {isAuthenticated && (
                  <li className="nav-item dropdown dropstart">
                    <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                      Cuenta
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to={Rutas.CUENTA_CONFIGURAR}>Configurar</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item" type='button' onClick={logout}>Cerrar sesión</button></li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Este es navbar para móviles */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src="/diadiapp_60x60.png" alt="" width="32" height="32" className="d-inline-block align-text-top" />&nbsp;DiaDiApp
            </Link>
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  {/* Solo se muestra cuando el usuario no está autenticado  */}
                  {!isAuthenticated && (
                    <>
                      <Link className="nav-link" to="/acceder">Acceder</Link>
                      <Link className="nav-link" to="/registrarme">Registrarme</Link>
                    </>
                  )}

                  {/* Solo se muestra si el usuario ha iniciado sesión  */}
                  {isAuthenticated && (
                    <>
                      <Link className="nav-link" to="/tareas">Tareas</Link>
                      <Link className="nav-link" to="/diarios">Diarios</Link>
                      <Link className="nav-link" to="/cuenta/configurar">Cuenta</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
