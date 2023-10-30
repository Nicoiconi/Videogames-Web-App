import { useEffect, useState } from "react"
import { useVideoGames } from "../../hooks/useVideoGames/useVideoGames"
import HomeLink from "../HomeLink/HomeLink"
import LinksBar from "../LinksBar/LinksBar"
import "./VideoGameDetail.css"
import { getSingleVideoGame } from "../../utils/api"
import StarRating from "../RatingStars/RatingStars"
import { deleteData } from "../../utils/indexedDB"

export default function VideoGameDetail() {

  const { singleVideoGame } = useVideoGames()

  const [noVideoGameStored] = useState("No video game stored")
  const [videoGameToRender, setVideoGameToRender] = useState({})

  useEffect(() => {
    const storedVideoGame = window.localStorage.getItem('stored-video-game')

    if (storedVideoGame) {
      setVideoGameToRender(storedVideoGame)
    }
  }, [])

  useEffect(() => {
    if (singleVideoGame?.client_created) {
      setVideoGameToRender(singleVideoGame)
      window.localStorage.setItem('stored-video-game', JSON.stringify(singleVideoGame))
      return
    } else {
      return async function () {
        const gameDetail = await getSingleVideoGame(singleVideoGame?.apiId)
        setVideoGameToRender(gameDetail)
        window.localStorage.setItem('stored-video-game', JSON.stringify(gameDetail))
      }
    }
  }, [singleVideoGame])

  async function handleRemoveFromDB() {
    const response = await deleteData(singleVideoGame?.apiId)
    alert(response)
  }
  // console.log(videoGameToRender)

  return (
    <div className="videogame">

      <LinksBar />
      <HomeLink />

      {
        videoGameToRender?.client_created || singleVideoGame?.inDB
          ? <div className="row remove-db-button">
            <button
              onClick={() => handleRemoveFromDB()}
            >
              Remove from IndexedDB
            </button>
          </div>
          : ""
      }

      {
        !videoGameToRender?.name
          ? <>{noVideoGameStored}</>
          :
          <div className="container-fluid single-game">

            <div className="row title-rating">
              <div className="col title">
                {videoGameToRender?.name}
              </div>
              <div className="col">
                <StarRating score={videoGameToRender?.rating} />
              </div>

            </div>
            <div className="row image-data">
              <div className="col image-container">
                <img
                  className="image"
                  src={videoGameToRender?.background_image}
                  alt=""
                />
              </div>
            </div>

            <hr />

            <div className="row platforms-game-detail-container">
              <div className="col">
                Platforms:
              </div>
              <div className="col platforms-game-detail-list">
                {
                  videoGameToRender?.client_created
                    ? videoGameToRender?.platforms?.map((p) => {
                      return (
                        <div key={`platform-${p}`}>
                          {p}
                        </div>
                      )
                    })
                    : videoGameToRender?.platforms?.map(p => {
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
                  videoGameToRender?.client_created
                    ? videoGameToRender?.genres?.map((g) => {
                      return (
                        <div key={`genre-${g}`}>
                          {g}
                        </div>
                      )
                    })
                    : videoGameToRender?.genres?.map(g => {
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
              <div className="row game-description">
                {videoGameToRender?.description_raw}
              </div>
            </div>
          </div>

      }

    </div>
  )
}
