import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo-p.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header>
      <nav className="flex justify-between items-center py-5 px-[2.5rem]">
        <Link to="/home" className="w-[2.5rem]">
          <img src={logo} alt="" />
        </Link>
        <div className="flex  w-[30%] justify-between">
          <NavLink
            to="calculator"
            className={({ isActive }) => {
              return (
                [isActive ? styles.selected : ""].join(" ") +
                " font-semibold text-[1.05rem]"
              );
            }}
          >
            Calculadora
          </NavLink>
          <NavLink
            to="history"
            className={({ isActive }) => {
              return (
                [isActive ? styles.selected : ""].join(" ") +
                " font-semibold text-[1.05rem]"
              );
            }}
          >
            Historico
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
