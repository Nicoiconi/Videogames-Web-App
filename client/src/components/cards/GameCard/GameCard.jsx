import { Link } from "react-router-dom"
import "./GameCard.css"

export default function GameCard({ id, name, genres, img, rating }) {

  return (
    <div className="">

      <div className="vg">

        <div className="name">
          <Link className="linkName" to={`/videogames/${id}`}>
            <h1>{name}</h1>
          </Link>
        </div>

        <div className="datos">

          <div className="rating">
            <h4>Rating: </h4>
            <p>{rating}</p>
          </div>

          <div className="genre">
            <h4>Genres: </h4>
            <div className="listaGeneros">
              {
                genres?.map(g => {
                  return (
                    <p key={g.id}>{g}</p>

                  )
                })
              }
            </div>

          </div>

        </div>


        <div className="img">
          <img src={img} alt="flag" />
        </div>

      </div>


    </div>
  )
}