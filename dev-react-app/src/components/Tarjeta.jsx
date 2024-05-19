import React, { useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";

export function Tarjeta({ tipo, onClick, children, className, size, ...props }) {
  const { theme } = useContext(ThemeContext);

  // className={`m-auto card card-css p-4 ${document.modoOscuroActivo ? 'card-dark-mode' : ''}`}
  const classNames = `
   card card-css p-4 
  ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}
  ${className}
  `;

  return (
    <div className={classNames}>
      {children}
    </div>
  );
}
