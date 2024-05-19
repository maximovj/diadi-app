import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findUserByUsername } from "../services/services";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";

export function Acceder({ onLogin }) {
  const navigate = useNavigate();
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = findUserByUsername(userName);

    if (user && user.password === password) {
      onLogin(user);
      navigate("/home");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="d-flex vh-100">
      <Tarjeta className={`m-auto p-4 card-dark-mode`}>
        <h2 className="mb-4">Acceder</h2>
        <form>
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
            <Boton tipo="success" onClick={handleLogin}>Acceder</Boton>
            <Boton tipo="primary">Registrarme</Boton>
          </div>
        </form>
      </Tarjeta>
    </div>
  );
}
