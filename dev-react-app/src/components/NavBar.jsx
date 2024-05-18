export function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark text-white" style={{ backgroundColor: '#363636' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
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
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/tareas">
                  Lista de tareas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Diario
                </a>
              </li>
            </ul>
           <div>
            <span>v1.0Alpha</span>
           </div>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
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
