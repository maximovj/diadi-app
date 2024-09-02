import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function Modal({ children, show, handleClose, tituloModal }) {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`modal ${show ? 'd-block' : ''}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className={`modal-content ${theme === 'light' ? 'bg-light text-dark' : 'card-dark-mode text-light'}`}>
                    <div className="modal-header">
                        <h5 className="modal-title">{tituloModal}</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}