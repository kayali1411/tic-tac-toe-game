import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../game-context';

const Control = () => {
    const { currentPlayerDispatcher, playerMovesDispatcher, mode, modeDispatcher } = useContext(GameContext);

    const startGame = () => {
        currentPlayerDispatcher({ type: 'SET_CURRENT_PLAYER', currentPlayer: 'playerOne' });
        document.querySelector('.start').classList.toggle('disabled');
        document.querySelector('.mode').classList.add('disabled');
        document.querySelector('.rest').classList.toggle('disabled');

    };

    const restartGame = () => {
        currentPlayerDispatcher({ type: 'SET_CURRENT_PLAYER', currentPlayer: '' });
        playerMovesDispatcher({ type: 'REST_PLAYER_MOVES' });
        modeDispatcher({ type: 'SET_MODE', mode: 'multi-player' });
        document.querySelector('.start').classList.toggle('disabled');
        document.querySelector('.mode').classList.toggle('disabled');
        document.querySelector('.rest').classList.toggle('disabled');
    };

    const setMode = () => {
        document.querySelector('.mode').classList.add('disabled');
        modeDispatcher({ type: 'SET_MODE', mode: 'single-mode' });
    }

    return (
        <div className="control box-shadow">
            <button className="control-button start box-shadow" onClick={startGame}>Start Game</button>
            <button className="control-button mode box-shadow" onClick={setMode}>Set Single Mode</button>
            <button className="control-button rest box-shadow disabled" onClick={restartGame}>Restart Game</button>
            <div>
                <h3 className="text">PlayerOne : X</h3>
                <h3 className="text">{ mode === 'single-mode' ? 'Bot' : 'PlayerTwo'} : O</h3>
            </div>
        </div>
    );
};

export default Control;