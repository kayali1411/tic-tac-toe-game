import React, { useContext, useEffect, useState } from 'react';
import GameContext from '../game-context';
import Blocks from './Blocks';
import Control from './Control';

const Game = () => {

    const { currentPlayer, playerMoves } = useContext(GameContext);
    const [ result, setResult ] = useState({ endGame: '', winner: '', player: '' });


    const checkWinner = (player) => {
        const winnerCode = ['ABC', 'DEF', 'GHI', 'ADG', 'BEH', 'CFI', 'AEI', 'CEG'];
        const isWinner = winnerCode.includes(playerMoves[player]);

        if(isWinner) {
            setResult({
                endGame: true,
                winner: true,
                player
            });
        }

        if((playerMoves.playerOne.length + playerMoves.playerTwo.length) === 9) {
            setResult({
                endGame: true,
                winner: false,
                player: 'Draw'
            });
        }
    };

    useEffect(() => {
        if(!!currentPlayer) {
            const prePlayer = currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';
            checkWinner(prePlayer);
        } else {
            setResult({ endGame: '', winner: '', player: '' });
        }
    }, [currentPlayer]);

    return (
        <>
            <h1>{currentPlayer}</h1>
            <h2>{result.endGame && result.player}</h2>
            <Blocks />
            <Control />
        </>
    );
}

export default Game;