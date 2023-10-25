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
  const [pageSize, setPageSize] = useState()

  useEffect(() => {
    setPageSize(0)
  }, [])

  useEffect(() => {
    const getStoredVideoGames = async () => {
      const storedVideoGames = await getAllData()
      setVideoGamesToShow(storedVideoGames)
    }
    if (videoGamesToShow?.length === 0) {
      getStoredVideoGames()
    }
  }, [])

  const handlePageSize = (e) => {
    const { value } = e.target
    setPageSize(Number(value))
  }

  const handleGetVideoGames = async () => {
    setISLoading(true)
    let videogames
    if (pageSize > 0) {
      videogames = await getVideogames(pageSize)
    } else {
      videogames = await getVideogames()
    }
    setVideoGamesToShow(videogames)
    setISLoading(false)
  }

  const handleStoreVideoGames = async () => {
    // let quantityCreated = 0
    if (videoGamesToShow?.length > 0) {
      await Promise.all(videoGamesToShow.map(async vg => {
        const result = await addData(vg)
        // if (result === "Already created") {
        //   // quantityCreated++
        // }
      }))
    }
    const storedVideoGames = await getAllData()
    setVideoGamesToShow(storedVideoGames)
  }

  const handleGetStoredVideoGames = async () => {
    const storedVideoGames = await getAllData()
    console.log(storedVideoGames)
    setVideoGamesToShow(storedVideoGames)
  }

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

      <div className="video-game-button">
        Number of games
        <input
          className="quantity-input"
          onChange={(e) => handlePageSize(e)}
          type="number"
          value={pageSize}
        />
        <button
          onClick={() => handleGetVideoGames()}
        >

          Get API Video Games
        </button>
      </div>

      <div className="video-games-buttons-bar">


        <button
          className="video-game-button"
          onClick={() => handleStoreVideoGames()}
        >
          Store Video Games
        </button>

        <button
          className="video-game-button"
          onClick={() => handleGetStoredVideoGames()}
        >
          Get Stored Video Games
        </button>

        <button
          className="video-game-button"
          onClick={() => handleClearVideoGames()}
        >
          Clear Stored Video Games
        </button>
      </div>


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
