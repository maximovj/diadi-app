// Componentes y Hooks de ReactJS
import React, { useContext } from 'react';

// Contexto
import { ThemeContext } from "../context/ThemeContext";

// Componente funcional
export function Tarjeta({ children, tipo, onClick, className, ...props }) {
  const { theme } = useContext(ThemeContext);

  // className={`m-auto card card-css p-4 ${document.modoOscuroActivo ? 'card-dark-mode' : ''}`}
  const classNames = `
   card card-css 
  ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}
  ${className}
  `;

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
