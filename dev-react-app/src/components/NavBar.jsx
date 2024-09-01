import { useAuth } from '../context/AuthContext';

export function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark text-white"
        style={{ backgroundColor: "#363636" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            DiaDiApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExampleLabel"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Solo se muestra cuando el usuario no está autenticado  */}
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/acceder">
                      Acceder
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/registrarme">
                      Registrarme
                    </a>
                  </li>
                </>
              )}

              {/* Solo se muestra si el usuario a iniciado sesión  */}
              {isAuthenticated && (
                <>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Tareas
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="/tareas">Panel</a></li>
                      <li><a className="dropdown-item" href="#">Crear una tarea</a></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Diarios
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="/diarios">Panel</a></li>
                      <li><a className="dropdown-item" href="#">Crear una tarea</a></li>
                    </ul>
                  </li>
                </>
              )}

            </ul>
            <div className="d-flex flex-column justify-content-end align-items-end">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* Solo se muestra si el usuario a iniciado sesión  */}
                {isAuthenticated && (
                  <>
                    <li className="nav-item dropdown dropstart">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Cuenta
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Ver información</a></li>
                        <li><a className="dropdown-item" href="/cuenta/configurar">Configurar</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" type='button' onClick={logout}>Cerrar sesión</a></li>
                      </ul>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            DiaDiApp
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <span>Menu</span>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                Lista de tareas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                Diario
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
