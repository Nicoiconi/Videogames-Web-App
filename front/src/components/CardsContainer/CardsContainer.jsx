import "./CardsContainer.css"
import Card from "../Card/Card"

export default function CardsContainer({ games }) {

  return (
    <div className="card-container">
      {
        games?.map(g => {
          return (
            <Card
              key={g?.apiId}
              game={g}
            />
          )
        })
      }
    </div>
  )
}
