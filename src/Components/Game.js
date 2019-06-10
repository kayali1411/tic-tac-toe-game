import React, { useContext, useEffect, useState } from 'react';
import GameContext from '../game-context';
import Blocks from './Blocks';
// import Control from './Control';
// import Result from './Result';


const Game = () => {

    const { currentPlayer, playerMoves } = useContext(GameContext);
    const [ winner, setWinner ] = useState('');

    const checkWinner = (player) => {
        const winnerCode = ['ABC', 'DEF', 'GHI', 'ADG', 'BEH', 'CFI', 'AEI', 'CEG'];
        const isWinner = winnerCode.includes(playerMoves[player]);
        if(isWinner) {
            setWinner(player);
        }
    };

    useEffect(() => {
        const prePlayer = currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';
        checkWinner(prePlayer);
    });

    return (
        <>
            <h1>{currentPlayer}</h1>
            <h2>{winner}</h2>
            <Blocks />
            {/*<Control />*/}
            {/*<Result />*/}
        </>
    );
}

export default Game;