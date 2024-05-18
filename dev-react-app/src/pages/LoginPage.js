import { Login } from "../components/login/Login";

export function LoginPage(){
   
        const handleLogin = (username, password) => {
            // Aquí podrías manejar la lógica de autenticación, como establecer el estado de autenticación en tu aplicación
            console.log(`Usuario autenticado: ${username} ${password}`);
          };
        
          return (
            <div>
              <h1 className="border border-primary p-3 mb-5">Página de Inicio de Sesión</h1>
              <Login onLogin={handleLogin} />
            </div>
          );
}