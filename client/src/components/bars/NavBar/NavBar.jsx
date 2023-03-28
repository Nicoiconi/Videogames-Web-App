import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getAllVideogames } from "../../../redux/actions/videogames";
import "./NavBar.css"

export default function NavBar() {
  const dispatch = useDispatch();


  function handleVideogamesClick(e) {
    dispatch(getAllVideogames())
  }

  return (
    <div className="linksContainer">
        <Link style={{ textDecoration: "none" }} onClick={(e) => handleVideogamesClick(e)} to="/videogames">
          <p className="link">Ver videojuegos</p>
        </Link>

        <Link style={{ textDecoration: "none" }} to="/create">
          <p className="link">Crear videojuego</p>
        </Link>
    </div>
  )
}