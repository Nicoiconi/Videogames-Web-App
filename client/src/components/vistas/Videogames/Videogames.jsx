import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameByName, getAllVideogames, getDbVideogames, getApiVideogames } from "../../../redux/actions/videogames";
import GameCard from "../../cards/GameCard/GameCard";
import "./Videogames.css";
import Paginate from "../../bars/Paginate/Paginate";
import Filters from "../../bars/Filters/Filters";
import GifPulpFiction from "../../Gifs/PulpFiction/PulpFiction";





export default function Videogames() {
  const dispatch = useDispatch();
  let allVideogames = useSelector((state) => state.filtered);
  console.log(allVideogames); // ok


  const [currentPage, setCurrentPage] = useState(1);

  const [videogamesPerPage, setVideogamesPerPage] = useState(15);

  const [paginateInput, setPaginateInput] = useState(1);

  const indexOfLastVideogame = currentPage * videogamesPerPage;

  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

  let currentVideogames;
  if (typeof allVideogames === "string") {
    currentVideogames = allVideogames;
  } else {
    currentVideogames = allVideogames?.slice(indexOfFirstVideogame, indexOfLastVideogame);
  };


  const [input, setInput] = useState({
    buscar: ''
  });


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = function (e) {
    setInput({
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(getVideogameByName(input.buscar)) // name = localState
    setInput({
      buscar: ''
    });
  };


  useEffect(() => {
    dispatch(getDbVideogames());
    dispatch(getApiVideogames());
    dispatch(getAllVideogames());
  }, []);


  return (
    <div className="eltodo">

      <div className="barContainer">
        <div className="searchContainer">
          <div>
            <input
              className="bar-btn"
              name="buscar"
              placeholder="buscá tu juego..."
              onChange={(e) => handleInputChange(e)}
              value={input.buscar}
              autoComplete="off"
            ></input>
          </div>

          <div>
            <button type="submit"
              onClick={(e) => handleSubmit(e)}
            >Buscar</button>
          </div>
        </div>

        <Filters setCurrentPage={setCurrentPage} setPaginateInput={setPaginateInput} />

      </div>

      <div className="botones">

        <Paginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          videogamesPerPage={videogamesPerPage}
          paginateInput={paginateInput}
          setPaginateInput={setPaginateInput}
          array={allVideogames}
        />

      </div>


      <div className="pindonga">

        {currentVideogames?.length ? currentVideogames.map(vj => {
          return (
            <div className="carta-juego" key={vj.createdByForm === true ? vj.id : vj.apiId} >
              <GameCard
                id={vj.createdByForm === true ? vj.id : vj.apiId}
                name={vj.name}
                img={vj.createdByForm === true ? vj.img_url : vj.image}
                genres={vj.genres}
                rating={vj.rating}
              />
            </div>

          )
        }
        ) : <div><GifPulpFiction /></div>}
        {/* falta poner un loader */}
      </div>
    </div>
  )

};