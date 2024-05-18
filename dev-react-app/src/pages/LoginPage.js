import { Login } from "../components/login/Login";

export function LoginPage(){
   
        const handleLogin = (username, password) => {
            // Aquí podrías manejar la lógica de autenticación, como establecer el estado de autenticación en tu aplicación
            console.log(`Usuario autenticado: ${username} ${password}`);
          };
        
          return (
            <div>
              <Login onLogin={handleLogin} />
            </div>
          );
}