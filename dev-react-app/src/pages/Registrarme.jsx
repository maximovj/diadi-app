import { useState } from "react";
import { addUser } from "../services/services";
import { useNavigate } from "react-router-dom";
import { Boton } from "../components/Boton";
import { Tarjeta } from "../components/Tarjeta";
import { crearUsuario } from "../services/service_usuario";

import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Registrarme() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if(!username.trim() || !password.trim())
    {
      toast.error('Verifica que los campos sean correctos.', {
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
      return;
    }

    try {
      addUser({ username, password });
      const response = await crearUsuario({
        usuario: username.trim(),
        contrasena: password.trim(),
        correo: `${username}@diadiapp.com`,
      });
      
      setPassword('');
      setUsername('');
      toast.success('Usuario registrado correctamente.', {
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
    } catch (err) {
      if (err.response) {
        console.log("Código de estado:", err.response.status);
        console.log("Error de respuesta del servidor:", err.response.data);
      }
    }
    
    //navigate('/')
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
            <Boton tipo="success" onClick={handleRegister}>
              Registrarme
            </Boton>
            <Boton tipo="primary">Acceder</Boton>
          </div>
      </Tarjeta>
      <ToastContainer />
    </div>
  );
}
