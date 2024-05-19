import React, { useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";

export function Boton({ tipo, onClick, children, className, size, ...props }) {
  const { theme } = useContext(ThemeContext);

  const classNames = `btn btn-${tipo} 
  ${theme === "light" ? `bg-${tipo} text-light` : "bg-dark text-light"}
  ${size ? `btn-${size}` : ""} 
  ${className}
  `;

  return (
    <button className={classNames} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
