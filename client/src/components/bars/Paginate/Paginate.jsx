import React from "react";
import "./Paginate.css";

const Paginate = ({
  currentPage,
  setCurrentPage,
  videogamesPerPage,
  paginateInput,
  setPaginateInput,
  array,
}) => {
  const pages = Math.ceil(
    Array.isArray(array) ? array.length / videogamesPerPage : 1
  );
  // const [input, setInput] = useState(1);
  // const newArray = Array.isArray(array) ? array : 1;

  const nextPage = () => {
    setPaginateInput(parseInt(paginateInput) + 1);
    setCurrentPage(parseInt(currentPage) + 1);
  };

  const LastPage = () => {
    setPaginateInput(parseInt(paginateInput) - 1);
    setCurrentPage(parseInt(currentPage) - 1);
  };

  //vendria a ser el condicional para hababilitar o no el input
  const onKeyDown = (e) => {
    const value = e.target.value;

    //este numero de key vendria siendo la tecla enter enter
    if (e.keyCode === 13) {
      setCurrentPage(parseInt(value));
      if (
        //este es para verificar que el numero ingresado no sea menor a 1
        parseInt(value < 1) ||
        //este es para verificar que el numero ingresado no sea mayor al numero maximo de paginas
        parseInt(value) > Math.ceil(pages) ||
        //este para verificar que coloque solo numeros
        isNaN(parseInt(value))
        // || input.length > pages
      ) {
        //si se cumple setea en la primer pagina
        setCurrentPage(1);
        setPaginateInput(1);
      } else {
        setCurrentPage(parseInt(value));
      }
    }
  };

  const onChange = (e) => {
    setPaginateInput(e.target.value);
  };

  return (
    <div className="paginate">

      <div className="margen">
        <button
          aria-label="Previous"
          disabled={currentPage === 1 || currentPage < 1}
          onClick={LastPage}
        >
          {"<"}
        </button>
      </div>

      <div className="margen">
        <input
          className="input-paginado"
          onChange={onChange}
          onKeyDown={(e) => onKeyDown(e)}
          value={paginateInput} // > pages ? 1 : input
          autoComplete="off"
        />
        {/* <span class="text">Page: {currentPage}</span> */}
      </div>

      <div className="margen">
        <span className="text">of {pages}</span>
      </div>

      <div className="margen">
        <button
          aria-label="Next"
          disabled={currentPage === pages || currentPage > pages}
          onClick={nextPage}
        >
          {">"}
        </button>
      </div>

    </div>
  );
};

export default Paginate;
