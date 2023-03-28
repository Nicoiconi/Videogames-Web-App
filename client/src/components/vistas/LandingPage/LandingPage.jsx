import React from "react";
import { Link } from "react-router-dom";
import supersmash from "../../../images/supersmash.gif";
import "./LandingPage.css"


export default function LandingPage() {
  return (
    <div>
      <div className="landing">
        <h1>Wellcome</h1>
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>

      <div className="fondo">
        <img src={supersmash} alt="" />
      </div>
    </div>
  )
}