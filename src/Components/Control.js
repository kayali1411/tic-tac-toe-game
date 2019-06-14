import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../game-context';

const Control = () => {
    const { currentPlayerDispatcher, playerMovesDispatcher } = useContext(GameContext);

    const startGame = () => {
        currentPlayerDispatcher({ type: 'SET_CURRENT_PLAYER', currentPlayer: 'playerOne' });
        document.querySelector('.start').classList.toggle('disabled');
        document.querySelector('.rest').classList.toggle('disabled');

    };

    const restartGame = () => {
        currentPlayerDispatcher({ type: 'SET_CURRENT_PLAYER', currentPlayer: '' });
        playerMovesDispatcher({ type: 'REST_PLAYER_MOVES' });
        document.querySelector('.start').classList.toggle('disabled');
        document.querySelector('.rest').classList.toggle('disabled');
    };

    return (
        <div className="control box-shadow">
            <button className="control-button start box-shadow" onClick={startGame}>Start Game</button>
            <button className="control-button rest box-shadow disabled" onClick={restartGame}>Restart Game</button>
        </div>
    );
};

export default Control;