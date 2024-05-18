export function Pie() {
  return (
    <>
      <footer className="text-white py-5 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3 className="texto-titulo-css">Preguntas frecuentes</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">¿Cómo usar el sistema?</a>
                </li>
                <li>
                  <a href="#">¿Los datos son reales?</a>
                </li>
                <li>
                  <a href="#">¿Las empresas son reales?</a>
                </li>
                <li>
                  <a href="#">
                    ¿Los archivos generados se almacenan en la nube/servidor?
                  </a>
                </li>
                <li>
                  <a href="#">¿Puedo insertar datos de prueba?</a>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h3 className="texto-titulo-css">Acerca de</h3>
              <p>Sin descripcion</p>
            </div>

            <div className="col-md-4">
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
