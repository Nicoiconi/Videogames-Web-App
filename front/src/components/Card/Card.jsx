import { Link } from "react-router-dom"
import StarRating from "../RatingStars/RatingStars"
import "./Card.css"
import { useVideoGames } from "../../hooks/useVideoGames/useVideoGames"

export default function Card({ game }) {

  const { setSingleVideoGame } = useVideoGames()

  function handleSingleVideoGame(){
    setSingleVideoGame(game)
  }

  return (
    <div className="card">
      <div className="card-title">
        <Link
          onClick={() => handleSingleVideoGame()}
          to={`/videogame-detail/${game?.apiId}`}
          className="link-color"
        >
          {game?.name}
        </Link>
      </div>

      <StarRating score={game?.rating} />

      <div className="card-image-container">
        <img
          src={game?.image}
          alt={`${game?.name} image`}
        />
      </div>

      <div className="platforms-genres">
        <div className="platforms-genres-list">
          <strong>
            Platforms {game?.platforms?.length}
          </strong>
          <ul>
            {
              game?.platforms?.map(p => {
                return (
                  <li key={`${game?.apiId}-platform-${p}`}>{p}
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className="platforms-genres-list">
          <strong>
            Genres {game?.genres?.length}
          </strong>
          <ul>
            {
              game?.genres.map(g => {
                return (
                  <li key={`${game?.apiId}-genre-${g}`}>
                    {g}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>

    </div>
  )
}
