import { useState, useEffect } from "react";

function useModoOscuro() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.modoOscuro = isDarkMode;

    // Selecciona todos los elementos con la clase card
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.toggle("card-dark-mode", isDarkMode);
    });

    // Selecciona todos los elementos con la clase btn
    const btns = document.querySelectorAll(".btn");
    btns.forEach((card) => {
      card.classList.toggle("btn-dark-mode", isDarkMode);
    });
  }, [isDarkMode]);

  return [isDarkMode, toggleDarkMode];
}

export default useModoOscuro;
