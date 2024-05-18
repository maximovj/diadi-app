import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findUserByUsername } from '../../services/services';

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const [userName, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = findUserByUsername(userName)

    if (user && user.password === password) {
      onLogin(user)
      navigate('/home')
    } else {
      alert('Credenciales incorrectas')
    }
  }

  return (
    <div className="d-flex vh-100">
      <div className="m-auto card card-css p-4">
        <h2 className="mb-4">Acceder</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Nombre de usuario</label>
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
          <div className="d-flex justify-content-between align-items-center">
            <button type="button" className="btn btn-success" onClick={handleLogin}>Acceder</button>
            <a href="/register" className="btn btn-danger">Registrarme</a>
          </div>
        </form>
      </div>
    </div>
  );
}
