import { useState } from "react";
import menuIcon from '../../assets/icons/icons8-menu.svg';


export function Sidebar({children}){
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex">
      <div className={`sidebar bg-light ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <button className="btn btn-outline-primary toggle-btn" onClick={toggleSidebar}>
            <img alt="" src={menuIcon}/>
          </button>
        </div>
        <div className="sidebar-content">
  <ul className="list-unstyled mb-0">
    <li className="fs-5 mb-4">
      <a className="text-decoration-none text-dark shadow-hover" href="/" style={{ position: 'relative' }}>
        Lista de Tareas
      </a>
    </li>
    <li className="fs-5 mb-4">
      <a className="text-decoration-none text-dark shadow-hover" href="/diario" style={{ position: 'relative' }}>
        Diario
      </a>
    </li>
  </ul>
</div>
      </div>
      <div className={`content p-4 ${isOpen ? 'sidebar-open' : ''}`}>
        {children}
      </div>
    </div>
  );
}