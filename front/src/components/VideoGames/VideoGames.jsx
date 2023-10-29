import { useEffect, useState } from "react"
import HomeLink from "../HomeLink/HomeLink"
import LinksBar from "../LinksBar/LinksBar"
import "./VideoGames.css"
import CardsContainer from "../CardsContainer/CardsContainer"
import { addData, deleteData, getAllData } from "../../utils/indexedDB"
import { getVideogames } from "../../utils/api"


export default function VideoGames() {

  const [gamesList, setGamesList] = useState([]);
  const [videoGamesToShow, setVideoGamesToShow] = useState([])
  const [isLoading, setISLoading] = useState(false)
  const [pageSize, setPageSize] = useState()
  const [filterByName, setFilterByName] = useState("")
  const [filterByGenres, setFilterByGenres] = useState("")
  const [filterByPlatform, setFilterByPlatform] = useState("")
  const [filterByRating, setFilterByRating] = useState(0);
  const [genresToShow, setGenresToShow] = useState([])
  const [platformsToShow, setPlatformsToShow] = useState([])

  useEffect(() => {
    const uniqueGenres = Array.from(new Set(videoGamesToShow.flatMap(vg => vg.genres)))
    setGenresToShow(uniqueGenres)
    const uniquePlatforms = Array.from(new Set(videoGamesToShow.flatMap(vg => vg.platforms)))
    setPlatformsToShow(uniquePlatforms)
  }, [videoGamesToShow])

  useEffect(() => {
    setPageSize(0)
  }, [])

  const getStoredVideoGames = async () => {
    const storedVideoGames = await getAllData()
    setGamesList(storedVideoGames)
    setVideoGamesToShow(storedVideoGames)
  }
  useEffect(() => {
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
    setGamesList(videogames)
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
    setVideoGamesToShow(storedVideoGames)
  }

  const handleClearVideoGames = async () => {
    await Promise.all(videoGamesToShow.map(vg => deleteData(vg.apiId)))
    const storedVideoGames = await getAllData()
    if (storedVideoGames.length === 0) setVideoGamesToShow([])
  }

  const filterVideoGames = (name, genre, platform, rating) => {
    let filteredGames = [...gamesList]
    if (name) {
      filteredGames = filteredGames.filter(vg => {
        return (
          vg.name.toLowerCase().includes(name.toLowerCase())
        )
      })
    }
    if (genre) {
      filteredGames = filteredGames.filter(vg => {
        return (
          vg.genres.includes(genre)
        )
      })
    }
    if (platform) {
      filteredGames = filteredGames.filter(vg => {
        return (
          vg.platforms.includes(platform)
        )
      })
    }
    if (rating) {
      filteredGames = filteredGames.filter(vg => {
        return (
          Number(vg.rating) === Number(rating)
        )
      })
    }
    setVideoGamesToShow(filteredGames)
  }

  const handleFilterByName = (e) => {
    const { value } = e.target
    setFilterByName(value)
    filterVideoGames(value, filterByGenres, filterByPlatform, filterByRating)
  }

  const handleFilterByNameGenre = (e) => {
    const { value } = e.target
    setFilterByGenres(value)
    filterVideoGames(filterByName, value, filterByPlatform, filterByRating)
  }

  const handleFilterByPlatform = (e) => {
    const { value } = e.target
    setFilterByPlatform(value)
    filterVideoGames(filterByName, filterByGenres, value, filterByRating)
  }

  const handleFilterByRating = (e) => {
    const {value} = e.target
    if(Number(value) === 0) return
    setFilterByRating(value)
    filterVideoGames(filterByName, filterByGenres, filterByPlatform, value)
  }

  const handleClearFilters = () => {
    setFilterByName('')
    setFilterByGenres('')
    setFilterByPlatform('')
    setFilterByRating(0)
    setVideoGamesToShow(gamesList)
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

      <div className="filter-inputs-bar">

        <div className="filter-label-input">
          <label htmlFor="filter-by">
            Filter By Name
          </label>
          <input
            onChange={(e) => handleFilterByName(e)}
            className="filter-by-name-input"
            id="filter-by-name"
            type="text"
            value={filterByName}
          />
        </div>

        <div className="filter-label-input">
          <label htmlFor="filter-by">
            Filter By Genre
          </label>
          <select
            onChange={(e) => handleFilterByNameGenre(e)}
            className="filter-by-name-input"
            name=""
            id=""
          >
            {
              genresToShow.map(g => {
                return (
                  <option key={g} value={g} >{g}</option>
                )
              })
            }
          </select>
        </div>

        <div className="filter-label-input">
          <label htmlFor="filter-by">
            Filter By Plarform
          </label>
          <select
            onChange={(e) => handleFilterByPlatform(e)}
            className="filter-by-name-input"
            name=""
            id=""
          >
            {
              platformsToShow.map(p => {
                return (
                  <option key={p} value={p} >{p}</option>
                )
              })
            }
          </select>
        </div>

        <div className="filter-label-input">
          <label htmlFor="filter-by">
            Filter By Rating
          </label>
          <select
            onChange={(e) => handleFilterByRating(e)}
            className="filter-by-name-input"
            name=""
            id=""
          >
            <option value="0"></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="filter-label-input">
          <button
            onClick={() => handleClearFilters()}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {
        isLoading
          ? "Loading..."
          : <>
            {
              videoGamesToShow?.length === 0
                ? "There are no video games"
                : <>
                  <CardsContainer games={videoGamesToShow} setVideoGamesToShow={setVideoGamesToShow} />
                </>
            }
          </>
      }
    </div>
  )
}
