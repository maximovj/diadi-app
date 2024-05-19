import { useState } from "react";
import { addUser } from "../services/services";
import { useNavigate } from "react-router-dom";
import { Boton } from "../components/Boton";
import { Tarjeta } from "../components/Tarjeta";

export function Registrarme(){
    
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const navigate = useNavigate();
    
      const handleRegister = () => {
        // Aquí podrías realizar la lógica de registro
        console.log(`Usuario registrado: ${username}`);
        console.log(`Contraseña: ${password}`);
        addUser({ username, password });
        navigate('/')
      };
    
      return (
        <div className="d-flex vh-100">
          <Tarjeta className={`m-auto p-4 card-dark-mode`}>
            <h2 className="mb-4">Registrarme</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Nombre de usuario</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Boton tipo="danger"  onClick={handleRegister}>Registrarme</Boton>
                <Boton tipo="primary">Acceder</Boton>
              </div>
            </form>
          </Tarjeta>
        </div>
      )
    }
