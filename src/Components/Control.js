import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../game-context';

const Control = () => {
    const { currentPlayerDispatcher, playerMovesDispatcher } = useContext(GameContext);

    const startGame = () => {
        currentPlayerDispatcher({ type: 'SET_CURRENT_PLAYER', currentPlayer: 'playerOne' });
    };

    const restartGame = () => {
        currentPlayerDispatcher({ type: 'SET_CURRENT_PLAYER', currentPlayer: '' });
        playerMovesDispatcher({ type: 'REST_PLAYER_MOVES' });
    };

    return (
        <div>
            <button onClick={startGame}>Start Game</button>
            <button onClick={restartGame}>Restart Game</button>
        </div>
    );
};

export default Control;