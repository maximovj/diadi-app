import useModoOscuro from "../hooks/useModoOscuro";

export default function SwitchModoOscuro() {
  const [isModoOscuro, toggleModoOscuro] = useModoOscuro();

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="switchModoOscuro"
        checked={isModoOscuro}
        onChange={toggleModoOscuro}
      />
      <label className="form-check-label" htmlFor="switchModoOscuro">
        Modo oscuro
      </label>
    </div>
  );
}
