import React from "react";

export default function DetailCard(game){

  return(
    <div>
      <h1>{game.name}</h1>
      <img src={game.background_image} alt="" />
    </div>
  );
};