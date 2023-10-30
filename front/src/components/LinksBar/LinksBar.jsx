import { useLocation, Link } from "react-router-dom";
import "./LinksBar.css"

export default function LinksBar() {

  const location = useLocation()

  return (
    <div>
      <div className="landing-page-links">
        <Link
          to="/videogames"
        >
          <button
            className={location.pathname === "/videogames" ? "landing-page-link route" : "landing-page-link"}

          >
            videogames
          </button>
        </Link>
        <Link
          to="/create-videogame"
        >
          <button
            className={location.pathname === "/create-videogame" ? "landing-page-link route" : "landing-page-link"}
          >
            create-videogame
          </button>
        </Link>
      </div>
    </div>
  )
}
