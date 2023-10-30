import { useEffect, useState } from "react"
import { useVideoGames } from "../../hooks/useVideoGames/useVideoGames"
import HomeLink from "../HomeLink/HomeLink"
import LinksBar from "../LinksBar/LinksBar"
import "./VideoGameDetail.css"
import { getSingleVideoGame } from "../../utils/api"
import StarRating from "../RatingStars/RatingStars"

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

  console.log(videoGameToRender)

  return (
    <div className="videogame">

      <LinksBar />
      <HomeLink />

      <div className="container-fluid single-game">

        <div className="row image-data">
          <div className="col">
            <img
              className="image"
              src={videoGameToRender?.background_image}
              alt=""
            />
          </div>
          <div className="col">
            {videoGameToRender?.name}
            <hr />
            <StarRating score={videoGameToRender?.rating} />

          </div>
        </div>

        <hr />

        <div className="row platforms-game-detail-container">
          <div className="col">
            Platforms:
          </div>
          <div className="col platforms-game-detail-list">
            {
              videoGameToRender?.platforms?.map(p => {
                return (
                  <div key={`platform-${p?.platgform?.id}`}>
                    {p?.platform?.name}
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="row genres-game-detail-container">
          <div className="col">
            Genres:
          </div>
          <div className="col genres-game-detail-list">
            {
              videoGameToRender?.genres?.map(g => {
                return (
                  <div key={`genre-${g?.id}`}>
                    {g?.name}
                  </div>
                )
              })
            }
          </div>
        </div>

        <hr />

        <div className="row game-detail-description">

          <h4 className="game-detail-description-title">
            Description
          </h4>
          {videoGameToRender?.description_raw}
        </div>
      </div>
    </div>
  )
}
