import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findUserByUsername } from '../../services/services';
export function Login({onLogin}){
    const navigate = useNavigate();
    const [userName, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
        const user = findUserByUsername(userName)

        if(user && user.password === password){
            onLogin(user)
            navigate('/home')
        }else{
            alert('Credenciales incorrectas')
        }

    }
    return (
        <div className="container d-flex justify-content-center align-items-center" >
          <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="mb-4">Login</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electronico</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="email" 
                  value={userName} 
                  onChange={(e) => setEmail(e.target.value)} 
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
              <button type="button" className="btn btn-primary" onClick={handleLogin}>Iniciar Sesión</button>
             <a href="/register" className="btn btn-secondary ms-2">Registrarse</a>
            </form>
          </div>
        </div>
      );
}