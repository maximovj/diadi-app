// Componentes
import { Modal } from "../Modal";

export function ModalCrear({ show, handleClose, handleSubmit, handleChange, tituloModal, diario }) {
    return (
        <Modal
            show={show}
            tituloModal={'Nuevo diario'}
            handleOnBtnCancel={handleClose}
            handleOnBtnOk={handleSubmit}
            handleSubmit={handleSubmit}
            textBtnCancel={'Cancelar'}
            textBtnOk={'Crear'}
        >
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
        </Modal>
    );
}