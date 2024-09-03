// Hooks de react
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Componentes
import { Boton } from '../../components/Boton';
import { Tarjeta } from "../../components/Tarjeta";

// Servicios
import { serviceDiarioVer, serviceDiarioActualizar, serviceDiarioEliminar } from '../../services/service_diario';

// Modulo de notificaciones toast 
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modulo de alert usando sweetalert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

// Hooks personalizados
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


// Componente funcional de ReactJS
export function EditarDiario() {
    const [diario, setDiario] = useState({});
    const navigate = useNavigate();
    const query = useQuery();
    const id = query.get('id');

    useEffect(() => {
        serviceDiarioVer(id)
            .then((response) => {
                if (response.data?.success) {
                    setDiario(response.data.data);
                }
            })
            .catch((err) => console.log(err))

    }, [id]);

    const showToast = (message, type) => {
        toast[type](message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const handleOnChangeFieldInput = (e) => {
        setDiario({
            ...diario,
            [e.target.name]: e.target.value,
        });
        console.log(diario);
    }

    const handleBtnActualizar = () => {
        if (!diario.titulo || !diario.contenido) {
            showToast('Verifique que los campos sean correctos.', 'error');
        }
        serviceDiarioActualizar(diario, id)
            .then((response) => {
                if (response.data?.success) {
                    showToast(response.data.ctx_contenido, 'success');
                }
            })
            .catch((err) => console.log(err));
    }

    const handleBtnEliminar = () => {
        mySwal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                serviceDiarioEliminar(id)
                    .then(response => {
                        if (response.data?.success) {
                            showToast(response.data.ctx_contenido, 'success');
                            setTimeout(() => {
                                //window.location.href = "/diarios";
                                navigate('/diarios');
                            }, 1000);
                        }
                    })
                    .catch(err => console.log(err));
            }
        });
    }

    return (<>
        <div className="container h-100 d-flex flex-column align-items-start">
            <Tarjeta className="w-50 h-100">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Título</label>
                        <input
                            className="form-control"
                            placeholder="Escribe un título"
                            type="text"
                            id="titulo"
                            name="titulo"
                            onChange={handleOnChangeFieldInput}
                            value={diario.titulo || ''}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contenido" className="form-label">Descripción</label>
                        <textarea
                            className="form-control"
                            placeholder="Escribe una descripción"
                            name="contenido"
                            id="contenido"
                            onChange={handleOnChangeFieldInput}
                            value={diario.contenido || ''} />
                    </div>
                </div>
                <div className="card-footer">
                    <div className='d-flex gap-2'>
                        <Boton tipo={'success'} size={'sm'} onClick={handleBtnActualizar}>Actualizar</Boton>
                        <Boton tipo={'danger'} size={'sm'} onClick={handleBtnEliminar}>Eliminar</Boton>
                    </div>
                </div>
            </Tarjeta>
        </div>
        <ToastContainer />
    </>);
}