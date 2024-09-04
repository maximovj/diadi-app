// Componentes y Hooks de ReactJS
import React, { useContext } from 'react';

// Contexto
import { ThemeContext } from "../context/ThemeContext";

// Componente funcional
export default function SwitchModoOscuro() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="switchModoOscuro"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <label className="form-check-label" htmlFor="switchModoOscuro">
        Modo oscuro
      </label>
    </div>
  );
}
