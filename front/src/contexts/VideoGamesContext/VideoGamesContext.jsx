import { createContext, useState } from "react"


export const VideoGamesContext = createContext()

export function VideoGamesProvider({ children }) {

  // const videoGameStored = window.localStorage.getItem('video-game-stored')
  // const singleGame = ""

  const [singleVideoGame, setSingleVideoGame] = useState("")

  return (
    <VideoGamesContext.Provider value={
      {
        singleVideoGame,
        setSingleVideoGame
      }
    }
    >
      {children}
    </VideoGamesContext.Provider>
  )
}