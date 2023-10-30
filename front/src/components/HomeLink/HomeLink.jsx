import { Link } from "react-router-dom";

import "./HomeLink.css"

import { AiTwotoneHome } from "react-icons/ai";

export default function HomeLink() {
  return (
    <div>
      <Link
        className="home-link"
        to="/"
      >
        <AiTwotoneHome />
        BACK TO HOME
      </Link>
    </div>
  )
}
