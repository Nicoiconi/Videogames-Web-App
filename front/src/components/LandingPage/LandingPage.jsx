import { Link } from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage() {
  return (
    <div className="landing-page">
      hola


      <Link to="/videogames">
        videogames
      </Link>
      <Link to="/videogame-detail">
        videogame-detail
      </Link>
      <Link to="/create-videogame">
        create-videogame
      </Link>

    </div>
  )
}
