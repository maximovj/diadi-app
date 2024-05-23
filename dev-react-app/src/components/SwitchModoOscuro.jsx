import React, { useContext } from 'react';
import useModoOscuro from "../hooks/useModoOscuro";
import { ThemeContext } from "../context/ThemeContext";

export default function SwitchModoOscuro() {
  const [isModoOscuro, toggleModoOscuro] = useModoOscuro();
  const {theme , toggleTheme } = useContext(ThemeContext);

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="switchModoOscuro"
        checked={theme == 'dark'}
        onChange={toggleTheme}
      />
      <label className="form-check-label" htmlFor="switchModoOscuro">
        Modo oscuro
      </label>
    </div>
  );
}
