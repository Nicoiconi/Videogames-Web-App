import { useEffect, useState } from "react"
import HomeLink from "../HomeLink/HomeLink"
import LinksBar from "../LinksBar/LinksBar"
import "./VideoGames.css"
import CardsContainer from "../CardsContainer/CardsContainer"
import { addData, deleteData, getAllData } from "../../utils/indexedDB"
import { getVideogames } from "../../utils/api"


export default function VideoGames() {

  const [videoGamesToShow, setVideoGamesToShow] = useState([])
  const [isLoading, setISLoading] = useState(false)
  const [pageSize, setPageSize] = useState(0)

  const handlePageSize = (e) => {
    const { value } = e.target
    setPageSize(Number(value))
  }

  const handleGetVideoGames = async () => {
    setISLoading(true)
    console.log(pageSize)
    let videogames
    if (pageSize > 0) {
      videogames = await getVideogames(pageSize)
    } else {
      videogames = await getVideogames()
    }
    // console.log(videogames)
    await Promise.all(videogames.map(vg => addData(vg)))
    const storedVideoGames = await getAllData()
    setVideoGamesToShow(storedVideoGames)
    setISLoading(false)
  }
  // console.log(videoGamesToShow)

  const handleClearVideoGames = async () => {
    await Promise.all(videoGamesToShow.map(vg => deleteData(vg.apiId)))
    const storedVideoGames = await getAllData()
    if (storedVideoGames.length === 0) setVideoGamesToShow([])
  }

  return (
    <div className="videogames">

      <LinksBar />

      videogames
      <HomeLink />

      <input
        onChange={(e) => handlePageSize(e)}
        type="number"
      />

      <button
        onClick={() => handleGetVideoGames()}
      >
        Get Video Games
      </button>

      <button
        onClick={() => handleClearVideoGames()}
      >
        Clear Video Games
      </button>

      {
        isLoading
          ? "Loading..."
          : <>
            {
              videoGamesToShow?.length === 0
                ? "There are no video games"
                : <CardsContainer games={videoGamesToShow} />
            }
          </>
      }
    </div>
  )
}
