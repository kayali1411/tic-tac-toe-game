import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import GameContext from '../game-context';
import Blocks from './Blocks';
import Control from './Control';

const Game = () => {

    const { currentPlayer, currentPlayerDispatcher, playerMoves, playerMovesDispatcher } = useContext(GameContext);
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

    const handleModalClose = () => {
        currentPlayerDispatcher({ type: 'SET_CURRENT_PLAYER', currentPlayer: '' });
        playerMovesDispatcher({ type: 'REST_PLAYER_MOVES' });
        setResult({
            endGame: '',
            winner: '',
            player: ''
        });
    };

    useEffect(() => {
        if(!!currentPlayer) {
            const prePlayer = currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';
            checkWinner(prePlayer);
        } else {
            setResult({ endGame: '', winner: '', player: '' });
        }
    }, [currentPlayer]);

    Modal.setAppElement(document.getElementById('root'));

    return (
        <>
            <h1>{currentPlayer}</h1>
            <Blocks />
            <Control />
            <Modal
                isOpen={!!result.endGame}
                onRequestClose={handleModalClose}
            >
                { result.winner && <h2>Winner: {result.player}</h2> }
                { !result.winner && <h2>Draw</h2> }
                <p onClick={handleModalClose}>Close</p>
            </Modal>
        </>
    );
}

export default Game;