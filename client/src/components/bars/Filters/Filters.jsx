import React from "react";
import { useDispatch } from "react-redux";
import { filterBy, orderBy, ratingBy } from "../../../redux/actions/videogames";


export default function Filters({ setCurrentPage, setPaginateInput }) {
  const dispatch = useDispatch();

  function handleFilterChek(e) {
    dispatch(filterBy(e.target.value));
    setCurrentPage(1);
    setPaginateInput(1);
  };
  // console.log(currentVideogames);

  function handleOrderChek(e) {
    console.log(e.target.value)
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
    setPaginateInput(1);

  };

  function handleOrderRating(e) {
    console.log(e.target.value)
    dispatch(ratingBy(e.target.value));
    setCurrentPage(1);
    setPaginateInput(1);
  }

  return (
    <div>
      <div className="filtroOrden">

        <div>
          <input
            type="radio"
            name="filter"
            value="All"
            onChange={(e) => handleFilterChek(e)}

          /> All
          <input
            type="radio"
            name="filter"
            value="DB"
            onChange={(e) => handleFilterChek(e)}
          /> DB
          <input
            type="radio"
            name="filter"
            value="API"
            onChange={(e) => handleFilterChek(e)}
          /> API

        </div>

        <div>

          <input
            type="radio"
            name="order"
            value="A-Z"
            onChange={(e) => handleOrderChek(e)}
          /> A-Z
          <input
            type="radio"
            name="order"
            value="Z-A"
            onChange={(e) => handleOrderChek(e)}
          /> Z-A

        </div>

        <div>

          <select onChange={(e) => handleOrderRating(e)}>
            <option
              //  onChange={(e) => handleOrderRating(e)} 
              value="default"
            >Rating</option>
            <option
              //  onChange={(e) => handleOrderRating(e)} 
              value="mejor"
            >Mejor Rating</option>
            <option
              //  onChange={(e) => handleOrderRating(e)} 
              value="peor"
            >Peor Rating</option>

          </select>

        </div>
      </div>
    </div>
  );
};