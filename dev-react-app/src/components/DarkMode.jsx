import useModoOscuro from "../hooks/useModoOscuro";
import "../App.css";

export default function DarkMode() {
  const [isDarkMode, toggleDarkMode] = useModoOscuro();

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="darkModeSwitch"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label className="form-check-label" htmlFor="darkModeSwitch">
        Modo oscuro
      </label>
    </div>
  );
}
