import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import VideoGames from './components/VideoGames/VideoGames'
import VideoGameDetail from './components/VideoGameDetail/VideoGameDetail'
import CreateVideoGameForm from './components/CreateVideoGameForm/CreateVideoGameForm'
import { VideoGamesProvider } from './contexts/VideoGamesContext/VideoGamesContext'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    exact: true
  },
  {
    path: "/videogames",
    element: <VideoGames />
  },
  {
    path: "/videogame-detail/:id",
    element: <VideoGameDetail />
  },
  {
    path: "/create-videogame",
    element: <CreateVideoGameForm />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VideoGamesProvider>
      <RouterProvider router={router} />
    </VideoGamesProvider>
  </React.StrictMode>,
)
