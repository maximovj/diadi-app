import { useEffect } from "react"
import useMediaQuery from "../useMediaQuery/useMediaQuery"
import { useLocalStorage } from "../useStorage/useStorage"

export default function useDarkMode() {
    const [darkMode, setDarkMode] = useLocalStorage("useDarkMode")
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    const enabled = darkMode ?? prefersDarkMode

    useEffect(() => {
        document.body.classList.toggle("dark-mode", enabled);

        // Selecciona todos los elementos con la clase card
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.classList.toggle("card-dark-mode", enabled);
        });

        // Selecciona todos los elementos con la clase btn
        const btns = document.querySelectorAll(".btn");
        btns.forEach(card => {
            card.classList.toggle("btn-dark-mode", enabled);
        });

    }, [enabled])

    return [enabled, setDarkMode]
}
