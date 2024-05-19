import useDarkMode from "../hooks/useDarkMode/useDarkMode";
import "../App.css";

export default function DarkMode() {
  const [darkMode, setDarkMode] = useDarkMode();

  const handleDarkModeToggle = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="darkModeSwitch"
        checked={darkMode}
        onChange={handleDarkModeToggle}
      />
      <label className="form-check-label" htmlFor="darkModeSwitch">
        Modo oscuro
      </label>
    </div>
  );
}
