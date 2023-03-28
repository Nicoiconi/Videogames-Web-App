import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameByID } from "../../../redux/actions/videogames";


import "./Details.css";
// import Platforms from "../components/Platforms";



export default function Details(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogameByID(props.match.params.id)); // (props.match.params.id)
  }, [dispatch, props]);

  let vgById = useSelector((state) => state.gameDetails)
  console.log(vgById)



  return (
    <div className="contenedor">
      <div className="game-card">
        <div>
          <h1>{vgById.name}</h1>
        </div>

        <div className="img-genres-plats">
          <div>
            <img src={vgById.createdByForm === true? vgById.img_url : vgById.background_image} alt="" className="game-img" />

          </div>
          <div className="genres-plats">

              genres:
            <div className="genres">
              {
                vgById?.genres?.map(g => {
                  return (
                    <p className="genre">{g}</p>
                  )
                })
              }
            </div>
              platforms:
            <div className="plats">
              {
                vgById?.platforms?.map(p => {
                  return(
                    <p>{p}</p>
                  )
                })
              }
            </div>
          </div>
        </div>

        <div>
          <p>{vgById.description}</p>

        </div>
      </div>

    </div>

  )
}