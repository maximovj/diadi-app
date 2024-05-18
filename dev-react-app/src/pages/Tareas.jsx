export function Tareas(){
    return (<>
    <div className="row">
        <div className="col-lg-4 mb-4">
            <div className="card">
                <div className="card-header">
                    <h1 className="txt-h1-css">Para hacer</h1>
                </div>
                <div className="card-body">
                    <ul>
                        <li>
                            Sin tareas asignadas
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-lg-4 mb-4">
            <div className="card">
                <div className="card-header">
                    <h1 className="txt-h1-css">En proceso</h1>
                </div>
                <div className="card-body">
                    <ul>
                        <li>
                            Sin tareas asignadas
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-lg-4 mb-4">
            <div className="card">
                <div className="card-header">
                    <h1 className="txt-h1-css">Hecho</h1>
                </div>
                <div className="card-body">
                    <ul>
                        <li>
                            Sin tareas asignadas
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>);
}