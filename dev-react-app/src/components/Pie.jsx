// Componente funcional
export function Pie() {
  return (
    <>
      <footer className="text-white py-5 mt-auto">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              <h3 className="texto-titulo-css">Acerca de</h3>
              <p>Este portal es para organizar tareas y escribir diarios.</p>
            </div>

            <div className="col-md-6">
              <h3 className="texto-titulo-css">Colaboradores</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Luis</a>
                </li>
                <li>
                  <a href="#">Boris</a>
                </li>
                <li>
                  <a href="#">Victor J.</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="text-muted small">
                &copy; <span id="currentYear"></span> Todos los derechos
                reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
