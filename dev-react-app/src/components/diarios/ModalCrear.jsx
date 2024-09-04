import { Boton } from "../Boton";
import { Modal } from "../Modal";

export function ModalCrear({ show, handleClose, handleSubmit, handleChange, tituloModal, diario }) {
    return (
        <Modal
            show={show}
            handleClose={handleClose}
            tituloModal={tituloModal}>
            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">Título</label>
                <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    onChange={handleChange}
                    placeholder="Ingrese el título"
                    value={diario.titulo}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">Contenido</label><br />
                <textarea
                    className="form-control"
                    id="contenido"
                    name="contenido"
                    onChange={handleChange}
                    placeholder="Ingrese el contenido"
                    value={diario.contenido}
                    required></textarea>
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-between align-content-center">
                    <Boton tipo={'secondary'} onClick={handleClose}>
                        Cancelar
                    </Boton>
                    <Boton tipo={'success'} onClick={handleSubmit}>
                        Crear
                    </Boton>
                </div>
            </div>
        </Modal>
    );
}