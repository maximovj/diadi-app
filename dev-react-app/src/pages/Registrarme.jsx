import { useState } from "react";
import { Boton } from "../components/Boton";
import { Tarjeta } from "../components/Tarjeta";
import { registrar } from "../services/service_auth";

import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Registrarme() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleRegister = async () => {
    const usernameTrimmed = username.trim();
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
      const response = await registrar({
        usuario: usernameTrimmed,
        contrasena: password.trim(),
        correo: `${usernameTrimmed}`,
      });

      const data = response.data;

      if (data?.success) {
        setPassword('');
        setUsername('');
        showToast(data.ctx_contenido, 'success');
      }

    } catch (err) {
      if (err.response?.status === 409) {
        showToast(err.response.data.ctx_contenido, 'error');
      }
    }
  };

  return (
    <div className="d-flex vh-100">
      <Tarjeta className={`m-auto p-4 card-dark-mode`}>
        <h2 className="mb-4">Registrarme</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <Boton tipo="success" onClick={handleRegister}>
            Registrarme
          </Boton>
        </div>
      </Tarjeta>
      <ToastContainer />
    </div>
  );
}
