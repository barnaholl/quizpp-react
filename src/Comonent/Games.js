import React, { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "./Layout/GameCard";
import styled from "styled-components";

const Games = () => {
  const title = "Games";
  const getGamesURI="http://localhost:8762/game-handler/"

  const [games, setGames] = useState(null);

  useEffect(() => {
    axios.get(getGamesURI)
        .then((res) => {
      setGames(res.data);
    });
  },[]);

  return (
      <div style={tileStyle}>
        <h1>{title}</h1>
      <Grid>
        {games ? 
        (
          games.map((game) => <GameCard game={game} />)
        ) 
        :
        (
          <h2>Loading games</h2>
        )}
      </Grid>
      </div>

  );
};

const Grid = styled.div`
  display: grid;
  gap 1rem;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
`;

const tileStyle={
  textAlign: "center"
}

export default Games;