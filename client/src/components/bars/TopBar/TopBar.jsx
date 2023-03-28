import React from "react";
import { Link } from "react-router-dom";
import logoHenry from "../../../images/logoHenry.jpg";
import home from "../../../images/home.jpg";
import "./TopBar.css";




export default function TopBar() {

  return (
    <div>
      <div className="container">
        
        <div className="">
          <img src={logoHenry} alt="logoHenry" />
        </div>

        <div className="titulo">
          <h1>Videogames App</h1>
        </div>

        <div className="cargar">
          <Link to={"/home"} className="homeLink">
            <img src={home} alt="home" />
          </Link>
        </div>

      </div>
    </div>
  )
}