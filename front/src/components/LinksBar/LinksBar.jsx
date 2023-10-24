import { Link } from "react-router-dom";
import "./LinksBar.css"

export default function LinksBar() {
  return (
    <div>
      <div className="landing-page-links">
        <Link
          className="landing-page-link"
          to="/videogames"
        >
          videogames
        </Link>
        <Link
          className="landing-page-link"
          to="/videogame-detail"
        >
          videogame-detail
        </Link>
        <Link
          className="landing-page-link"
          to="/create-videogame"
        >
          create-videogame
        </Link>
      </div>
    </div>
  )
}
