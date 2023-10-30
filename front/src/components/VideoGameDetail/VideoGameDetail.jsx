import { useEffect, useState } from "react"
import { useVideoGames } from "../../hooks/useVideoGames/useVideoGames"
import HomeLink from "../HomeLink/HomeLink"
import LinksBar from "../LinksBar/LinksBar"
import "./VideoGameDetail.css"
import { getSingleVideoGame } from "../../utils/api"

export default function VideoGameDetail() {

  const { singleVideoGame } = useVideoGames()

  const [videoGameToRender, setVideoGameToRender] = useState("")

  const storedVideoGame = window.localStorage.getItem('stored-video-game') 

  useEffect(() => {
    if (storedVideoGame) {
      setVideoGameToRender(JSON.parse(storedVideoGame))
    } else {
      return async function () {
        const gameDetail = await getSingleVideoGame(singleVideoGame)
        setVideoGameToRender(gameDetail)
        window.localStorage.setItem('stored-video-game', JSON.stringify(gameDetail))
      }
    }
  }, [singleVideoGame])

  return (
    <div className="videogame">

      <LinksBar />
      <HomeLink />

      <div className="container-fluid">
        {videoGameToRender?.name}
        <img src={videoGameToRender?.background_image} alt="" />
      </div>
    </div>
  )
}
