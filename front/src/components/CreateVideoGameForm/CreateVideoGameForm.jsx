import { useState } from "react"
import HomeLink from "../HomeLink/HomeLink"
import LinksBar from "../LinksBar/LinksBar"
import "./CreateVideoGameForm.css"
import { addData } from "../../utils/indexedDB"

export default function CreateVideoGameForm() {

  const [newVideoGame, setNewVideoGame] = useState({
    client_created: true,
    genres: [],
    platforms: []
  })

  function handleNewVideoGameData(e) {
    const { name, value } = e.target
    if (name === "image") {
      setNewVideoGame(prevState => {
        return {
          ...prevState,
          [name]: value,
          background_image: value
        }
      })
    } else {
      setNewVideoGame(prevState => {
        return {
          ...prevState,
          [name]: value
        }
      })
    }
  }

  function handleGenres(e) {
    const { value, checked } = e.target

    if (checked) {
      setNewVideoGame(prevState => {
        return {
          ...prevState,
          genres: [
            ...prevState.genres, value
          ]
        }
      })
    } else {
      setNewVideoGame(prevState => {
        return {
          ...prevState,
          genres: prevState.genres.filter(g => g !== value)
        }
      })
    }
  }

  function handlePlatforms(e) {
    const { value, checked } = e.target
    if (checked) {
      setNewVideoGame(prevState => {
        return {
          ...prevState,
          platforms: [
            ...prevState.platforms, value
          ]
        }
      })
    } else {
      setNewVideoGame(prevState => {
        return {
          ...prevState,
          platforms: prevState.platforms.filter(p => p !== value)
        }
      })
    }
  }

  async function handleCreateVideoGame(e) {
    e.preventDefault()
    const createVideoGame = await addData(newVideoGame)

    if (createVideoGame) console.log("Video Game Created")
  }

  console.log(newVideoGame)
  return (
    <div className="create-videogame">

      <LinksBar />
      <HomeLink />

      <form action="" onSubmit={(e) => handleCreateVideoGame(e)}>
        <button>CREATE</button>
        <div className="container-fluid form-container">


          <div className="container">

            <div className="row">
              <div className="col">
                <label htmlFor="">
                  Name
                </label>
              </div>
              <div className="col">
                <input
                  onChange={(e) => handleNewVideoGameData(e)}
                  name="name"
                  value={newVideoGame?.name}
                  type="text"
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="">
                  Image URL
                </label>
              </div>
              <div className="col">
                <input
                  onChange={(e) => handleNewVideoGameData(e)}
                  name="image"
                  value={newVideoGame?.image}
                  type="text"
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="">
                  Rating
                </label>
              </div>
              <div className="col">
                <input
                  onChange={(e) => handleNewVideoGameData(e)}
                  name="rating"
                  value={newVideoGame?.rating}
                  type="number"
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="">
                  Description
                </label>
              </div>
              <div className="col">
                <textarea
                  onChange={(e) => handleNewVideoGameData(e)}
                  name="description_raw"
                  value={newVideoGame?.description_raw}
                  id=""
                  cols="30"
                  rows="10">
                </textarea>
              </div>
            </div>
          </div>

          {/*  */}

          <div className="container genres-platform-new-game">

            <div className="row">
              <div className="col">
                Genres
              </div>
              <div className="col genres-new-game">
                <div className="row">
                  <input
                    onChange={(e) => handleGenres(e)}
                    id="action-genre"
                    name="Action"
                    value="Action"
                    type="checkbox"
                  />
                  <label htmlFor="action-genre">
                    Action
                  </label>
                </div>
                <div className="row">
                  <input
                    onChange={(e) => handleGenres(e)}
                    id="adventure-genre"
                    name="Adventure"
                    value="Adventure"
                    type="checkbox"
                  />
                  <label htmlFor="adventure-genre">
                    Adventure
                  </label>
                </div>
                <div className="row">
                  <input
                    onChange={(e) => handleGenres(e)}
                    id="sports-genre"
                    name="Sports"
                    value="Sports"
                    type="checkbox"
                  />
                  <label htmlFor="sports-genre">
                    Sports
                  </label>
                </div>
                <div className="row">
                  <input
                    onChange={(e) => handleGenres(e)}
                    id="rpg-genre"
                    name="PRG"
                    value="RPG"
                    type="checkbox"
                  />
                  <label htmlFor="rpg-genre">
                    RPG
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                Platforms
              </div>
              <div className="col platforms-new-game">
                <div className="row">
                  <input
                    onChange={(e) => handlePlatforms(e)}
                    id="ps-platform"
                    name="play-stations"
                    value="Play Station"
                    type="checkbox"
                  />
                  <label htmlFor="ps-platform">
                    Play Station
                  </label>
                </div>
                <div className="row">
                  <input
                    onChange={(e) => handlePlatforms(e)}
                    id="pc-platform"
                    name="PC"
                    value="PC"
                    type="checkbox"
                  />
                  <label htmlFor="pc-platform">
                    PC
                  </label>
                </div>
                <div className="row">
                  <input
                    onChange={(e) => handlePlatforms(e)}
                    id="rpg-genre"
                    name="Nintendo"
                    value="Nintendo"
                    type="checkbox"
                  />
                  <label htmlFor="nintendo-genre">
                    Nintendo
                  </label>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
