import { useEffect, useState } from "react"
import HomeLink from "../HomeLink/HomeLink"
import LinksBar from "../LinksBar/LinksBar"
import "./VideoGames.css"
import CardsContainer from "../CardsContainer/CardsContainer"
import { addData, deleteData, getAllData } from "../../utils/indexedDB"


export default function VideoGames() {

  const apiKey = import.meta.env.VITE_API_KEY

  const [videoGamesToShow, setVideoGamesToShow] = useState([])
  const [isLoading, setISLoading] = useState(false)

  const getVideogames = async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`)

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`)
      }

      const data = await response.json()

      const videoGameFormat = data.results.map(vg => {
        return {
          apiId: vg.id,
          name: vg.name,
          image: vg.background_image,
          rating: Math.round(vg.rating),
          genres: vg.genres.map((g) => g.name),
          platforms: vg.platforms.map((p) => p.platform.name),
        }
      })

      return videoGameFormat
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllData().then(result => setVideoGamesToShow(result))
  }, [])

  const handleGetVideoGames = async () => {
    setISLoading(true)
    const videogames = await getVideogames()
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
    // console.log(storedVideoGames)
    if (storedVideoGames.length === 0) setVideoGamesToShow([])
  }

  return (
    <div className="videogames">

      <LinksBar />

      videogames
      <HomeLink />

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
