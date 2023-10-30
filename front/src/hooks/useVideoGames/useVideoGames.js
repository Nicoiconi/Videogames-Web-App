import { useContext } from "react"
import { VideoGamesContext } from "../../contexts/VideoGamesContext/VideoGamesContext"

export function useVideoGames() {

  const { singleVideoGame, setSingleVideoGame } = useContext(VideoGamesContext)

  return { singleVideoGame, setSingleVideoGame }
}