import React, { useContext } from "react";
// import logo from "../../Assets/logo.svg";
import { HiMenu, HiOutlineTicket } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { RiLogoutCircleLine, RiCoupon2Line } from "react-icons/ri";
import { MdShareLocation, MdDirectionsBus } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { TiTicket } from "react-icons/ti";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import "./Sidebar.css";
import { AuthContext } from "../../../Contexts";

const SideBar = () => {
  const { signOut } = useContext(AuthContext);

  const useActive = (pathName) => {
    const match = useMatch(pathName);
    return match && pathName === match.pathname;
  };

  return (
    <div className="sidebar-parent closed">
      <div className="sidebar-action-btn">
        <HiMenu
          onClick={(event) => {
            event.preventDefault();
            const sidebar = document.querySelector(".sidebar-parent");
            sidebar.classList.toggle("expanded");
            sidebar.classList.toggle("closed");
          }}
          className="open-btn"
        />
      </div>
      <div className="sidebar-logo">
        {/* <img src={logo} alt="Rish Shipping" /> */}
        <h1>Rish Shipping</h1>
      </div>
      <div className="sidebar-menu-parent">
        <Link className="sidebar-link" to={"/admin"}>
          <div
            className={`sidebar-menu-item ${useActive("/admin") && "active"}`}
          >
            <AiOutlineHome className="sidebar-menu-item-icon" />
            <p>Home</p>
          </div>
        </Link>
        <Link className="sidebar-link" to={"/admin/bus"}>
          <div
            className={`sidebar-menu-item ${
              useActive("/admin/bus") && "active"
            }`}
          >
            <BiMoviePlay className="sidebar-menu-item-icon" />
            <p>Movies</p>
          </div>
        </Link>
        <Link className="sidebar-link" to={"/admin/coupons"}>
          <div
            className={`sidebar-menu-item ${
              useActive("/admin/coupons") && "active"
            }`}
          >
            <RiCoupon2Line className="sidebar-menu-item-icon" />
            <p>Coupons</p>
          </div>
        </Link>
        <Link className="sidebar-link" to={"/admin/bookings"}>
          <div
            className={`sidebar-menu-item ${
              useActive("/admin/bookings") && "active"
            }`}
          >
            <TiTicket className="sidebar-menu-item-icon" />
            <p>Bookings</p>
          </div>
        </Link>
        <hr />
        <div onClick={signOut} className="sidebar-menu-item">
          <RiLogoutCircleLine className="sidebar-menu-item-icon" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
