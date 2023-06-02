import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TbUserCircle, TbTicket } from "react-icons/tb";
import { AuthContext } from "../../../Contexts/index";
import logo from "../../../Assets/logo.png";
import "./Header.css";

const Header = ({ active }) => {
  const { userDetails } = useContext(AuthContext);
  const [activeState, setActiveState] = useState(active);

  const onScroll = () => {
    const header = document.querySelector(".header-parent");
    if (activeState) return;
    else {
      if (window.scrollY > 110) {
        header.classList.add("scrolled");
      } else if (!active) {
        header.classList.remove("scrolled");
      }
    }
  };

  window.addEventListener("scroll", onScroll);

  return (
    <div className={`header-parent ${activeState && "scrolled"}`}>
      <div className="header-logo-div">
        <img src={logo} alt="logo" style={{ "border-radius": "50%" }} />
      </div>
      <div className="header-links-div">
        <Link to="/">
          <div className="header-link">
            <TbTicket className="links-icon" />
            <p>Book Tickets</p>
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="header-link">
            <TbUserCircle className="links-icon" />
            <p>{userDetails.name}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
