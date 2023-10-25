import "./LandingPage.css"
import LinksBar from "../LinksBar/LinksBar";

export default function LandingPage() {

  const RAWG_API = "https://rawg.io/apidocs"

  return (
    <div className="landing-page">

      <LinksBar />

      <h1>Bienvenidos</h1>

      <p>Aplicación web con temática de videojuegos utilizando <a href={RAWG_API} target="_blank" rel="noreferrer">RAWG API</a></p>

    </div>
  )
}
