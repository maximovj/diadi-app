import { useState, useEffect } from "react";

function useModoOscuro() {
  const [isModoOscuro, setIsModoOscuro] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleModoOscuro = () => {
    setIsModoOscuro((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isModoOscuro);
    document.modoOscuroActivo = isModoOscuro;

    // Selecciona todos los elementos con la clase card
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.toggle("card-dark-mode", isModoOscuro);
    });

    // Selecciona todos los elementos con la clase btn
    const btns = document.querySelectorAll(".btn");
    btns.forEach((card) => {
      card.classList.toggle("btn-dark-mode", isModoOscuro);
    });
  }, [isModoOscuro]);

  return [isModoOscuro, toggleModoOscuro];
}

export default useModoOscuro;
