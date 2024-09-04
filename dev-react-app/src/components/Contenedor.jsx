// Componente funcional
export function Contenedor({ children, alignItems = 'align-items-start' }) {
    return (<di className={`container mt-2 h-100 d-flex flex-column ${alignItems}`}>
        {children}
    </di>);
};