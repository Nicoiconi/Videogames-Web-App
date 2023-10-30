import "./LandingPage.css"
import LinksBar from "../LinksBar/LinksBar";

export default function LandingPage() {

  const RAWG_API = "https://rawg.io/apidocs"

  return (
    <div className="landing-page">

      <LinksBar />

      <h1>Bienvenidos</h1>

      <p>Aplicación web con temática de videojuegos utilizando <a href={RAWG_API} target="_blank" rel="noreferrer">RAWG API</a></p>

      <p>A tener en cuenta: el boton `Store Video Games` guarda los juegos en el navegador. No olvide presionar `Clear Stored Video Games` antes de salir.</p>

      <p>Gracias por pasar! Espero te guste y te sirva.</p>

    </div>
  )
}
