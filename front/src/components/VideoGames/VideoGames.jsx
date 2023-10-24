import { useEffect, useState } from "react"
import HomeLink from "../HomeLink/HomeLink"
import LinksBar from "../LinksBar/LinksBar"
import "./VideoGames.css"
import CardsContainer from "../CardsContainer/CardsContainer"
import Card from "../Card/Card"


export default function VideoGames() {

  const apiKey = import.meta.env.VITE_API_KEY

  const [videoGamesToShow, setVideoGamesToShow] = useState([])

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
    const fetchData = async () => {
      if(videoGamesToShow?.length === 0){
        try {
          const apiVideoGames = await getVideogames()
          setVideoGamesToShow(apiVideoGames)
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchData()
  }, [])

  console.log(videoGamesToShow)

  return (
    <div className="videogames">

      <LinksBar />

      videogames
      <HomeLink />
{/* 
      {
        videoGamesToShow?.map(vg => {
          return(
            <Card game={vg} />
          )
        })
      } */}

      <CardsContainer games={videoGamesToShow} />
    </div>
  )
}
