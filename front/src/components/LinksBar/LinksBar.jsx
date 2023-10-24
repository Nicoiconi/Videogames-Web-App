import { useLocation, Link } from "react-router-dom";
import "./LinksBar.css"

export default function LinksBar() {

  const location = useLocation()

  return (
    <div>
      <div className="landing-page-links">
        <Link
          className={location.pathname === "/videogames" ? "landing-page-link route" : "landing-page-link"}
          to="/videogames"
        >
          videogames
        </Link>
        <Link
          className={location.pathname === "/videogame-detail" ? "landing-page-link route" : "landing-page-link"}
          to="/videogame-detail"
        >
          videogame-detail
        </Link>
        <Link
          className={location.pathname === "/create-videogame" ? "landing-page-link route" : "landing-page-link"}
          to="/create-videogame"
        >
          create-videogame
        </Link>
      </div>
    </div>
  )
}
