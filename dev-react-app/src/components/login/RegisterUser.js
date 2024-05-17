import { useState } from "react";
import { addUser } from "../../services/services";
import { useNavigate } from "react-router-dom";

export function RegisterUser(){
    
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
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="card border border-primary p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="mb-4">Registro</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Nombre de Usuario</label>
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
              <button type="button" className="btn btn-primary" onClick={handleRegister}>Registrarse</button>
              <a href="/" className="btn btn-secondary ms-2">Volver al inicio sesion</a>
            </form>
          </div>
        </div>
      )
    }
