import "./CardsContainer.css"
import Card from "../Card/Card"

export default function CardsContainer({ games, setVideoGamesToShow }) {

  function handleOrderBy(e) {
    const { value } = e.target
    if (value === "A-Z") {
      const orderAZ = [...games]?.sort((a, b) => a?.name.localeCompare(b?.name))
      setVideoGamesToShow(orderAZ)
    } else if (value === "Z-A") {
      const orderZA = [...games]?.sort((a, b) => b?.name.localeCompare(a?.name))
      setVideoGamesToShow(orderZA)
    } else if (value === "lowRate") {
      const lowRating = [...games]?.sort((a, b) => a?.rating - b?.rating)
      setVideoGamesToShow(lowRating)
    } else if (value === "highRate") {
      const highRating = [...games]?.sort((a, b) => b?.rating - a?.rating)
      setVideoGamesToShow(highRating)
    } else {
      setVideoGamesToShow(games)
    }
  }

  return (
    <>
      <div className="row">
        <h3>{`${games?.length} games were found`}</h3>
      </div>
      <div className="row order-by-container">
        <div className="col">
          Order By
        </div>
        <div className="col">
          <input
            id="A-Z"
            name="order-by"
            value="A-Z"
            type="radio"
            onClick={(e) => handleOrderBy(e)}
          />
          <label htmlFor="A-Z">
            A-Z
          </label>
        </div>
        <div className="col">
          <input
            id="Z-A"
            name="order-by"
            value="Z-A"
            type="radio"
            onClick={(e) => handleOrderBy(e)}
          />
          <label htmlFor="Z-A">
            Z-A
          </label>
        </div>
        <div className="col">
          <input
            id="lowRate"
            name="order-by"
            value="lowRate"
            type="radio"
            onClick={(e) => handleOrderBy(e)}
          />
          <label htmlFor="lowRate">
            Low Rating
          </label>
        </div>
        <div className="col">
          <input
            id="highRate"
            name="order-by"
            value="highRate"
            type="radio"
            onClick={(e) => handleOrderBy(e)}
          />
          <label htmlFor="highRate">
            High Rating
          </label>
        </div>

      </div>

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
    </>
  )
}
