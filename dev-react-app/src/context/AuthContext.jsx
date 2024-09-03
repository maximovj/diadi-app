// AuthContext.js
import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(Cookies.get('session_diadiapp'));

    const login = (data) => {
        Cookies.set('session_diadiapp', data, { expires: 7 });
        setIsAuthenticated(true);
        navigate("/panel");
    };

    const logout = () => {
        Cookies.remove('session_diadiapp');
        localStorage.setItem("theme", "light");
        setIsAuthenticated(false);
        navigate("/acceder");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
