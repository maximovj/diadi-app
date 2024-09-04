import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Boton } from "./Boton";

export function Modal({ children, show, handleOnBtnCancel, handleOnBtnOk, tituloModal, textBtnCancel, textBtnOk }) {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`modal ${show ? 'd-block' : ''}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className={`modal-content ${theme === 'light' ? 'bg-light text-dark' : 'card-dark-mode text-light'}`}>
                    <div className="modal-header">
                        <h5 className="modal-title">{tituloModal}</h5>
                        <button type="button" className="btn-close" onClick={handleOnBtnCancel}></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-end gap-2 align-content-center">
                            <Boton type={'secondary'} size={'sm'} onClick={handleOnBtnCancel}>
                                <i className="la la-circle-o" /> {textBtnCancel}
                            </Boton>
                            <Boton type={'success'} size={'sm'} onClick={handleOnBtnOk}>
                                <i className="la la-check-circle-o" /> {textBtnOk}
                            </Boton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}