// Hooks ReactJS
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";

// Hooks para Notificaciones
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Servicios
import { acceder } from '../services/service_auth';
import { useAuth } from '../context/AuthContext';


export function Acceder({ onLogin }) {
  const navigate = useNavigate();
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

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
  };

  const handleLogin = async () => {
    const usernameTrimmed = userName.trim();
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;

    if (!usernameTrimmed || !password.trim()) {
      showToast('Verifica que los campos sean correctos.', 'error');
      return;
    }

    if (!usernameRegex.test(usernameTrimmed)) {
      showToast('El nombre de usuario solo puede contener letras, números, guiones (-) y guiones bajos (_).', 'error');
      return;
    }

    try {

      const acceder_sistema = await acceder({
        usuario: usernameTrimmed,
        contrasena: password.trim(),
      });

      const data = acceder_sistema.data;

      if (data?.success) {
        setEmail('');
        setPassword('');
        showToast(data.ctx_contenido, 'success');
        login(JSON.stringify(data.data));
        navigate("/panel");
      }

    } catch (err) {
      console.log(err);
      showToast(err.response.data.cxt_contenido, 'error');
    }

  };

  return (
    <div className="d-flex vh-100">
      <Tarjeta className={`m-auto p-4 card-dark-mode`}>
        <h2 className="mb-4">Acceder</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={userName}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div></div>
          <Boton tipo="success" onClick={handleLogin}>Acceder</Boton>
        </div>
      </Tarjeta>
      <ToastContainer />
    </div>
  );
}
