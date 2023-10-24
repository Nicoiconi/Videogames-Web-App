import "./Card.css"

export default function Card({ game }) {
  console.log(game)
  return (
    <div className="card">
      <h6>{game.name}</h6>

      
    </div>
  )
}
