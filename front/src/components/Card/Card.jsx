import StarRating from "../RatingStars/RatingStars"
import "./Card.css"

export default function Card({ game }) {

  return (
    <div className="card">
      <div className="card-title">
        {game.name}
      </div>

      <StarRating score={game.rating} />

      <div className="card-image-container">
        <img
          src={game.image}
          alt={`${game.name} image`}
        />
      </div>

      <div className="platforms-genres">
        <div className="platforms-genres-list">
          <strong>
            Platforms {game.platforms.length}
          </strong>
          <ul>
            {
              game.platforms.map(p => {
                return (
                  <li key={`${game.apiId}-platform-${p}`}>{p}
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className="platforms-genres-list">
          <strong>
            Genres {game.genres.length}
          </strong>
          <ul>
            {
              game.genres.map(g => {
                return (
                  <li key={`${game.apiId}-genre-${g}`}>
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
