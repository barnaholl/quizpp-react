import React, { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "./Layout/GameCard";
import styled from "styled-components";

const Games = () => {
  const title = "Games";
  const getGamesURI="http://localhost:8762/game-handler/game"

  const [games, setGames] = useState(null);

  useEffect(() => {
    axios.get(getGamesURI)
        .then((res) => {
      setGames(res.data);
    });
  });

  return (
    <React.Fragment>
      <h1>{title}</h1>
      <Grid>
        {games ? (
          games.map((game) => <GameCard game={game} />)
        ) : (
          <p>Loading games</p>
        )}
      </Grid>
    </React.Fragment>
  );
};
const Grid = styled.div`
  background: gray;
  position: relative;
  max-width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: minmax(50px, auto);
  grid-gap: 10px;
  margin: 5%px;
`;

export default Games;