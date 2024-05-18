import { useState } from "react";
import menuIcon from '../../assets/icons/icons8-menu.svg';


export function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div></div>
  );
}