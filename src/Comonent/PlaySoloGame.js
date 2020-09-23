import React, { useEffect, useState } from "react";

const PlaySoloGame = () => {
    const gameURI=window.location.href.split("/");
    const gameId=gameURI[gameURI.length-1];
    
    return(<p>{gameId}</p>)
}

export default PlaySoloGame;