import React, { useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";

export function Boton({ children, onClick, className, size, type, ...props }) {
  const { theme } = useContext(ThemeContext);

  const classNames = `btn btn-${type} 
  ${theme === "light" ? `bg-${type} text-light` : "bg-dark text-light"}
  ${size ? `btn-${size}` : ""} 
  ${className}
  `;

  return (
    <button className={classNames} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
