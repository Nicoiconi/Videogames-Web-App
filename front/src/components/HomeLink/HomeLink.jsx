import { Link } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";

export default function HomeLink() {
  return (
    <div>
      <Link to="/"><AiTwotoneHome /></Link>
    </div>
  )
}
