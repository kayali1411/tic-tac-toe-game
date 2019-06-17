import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import GameContext from '../game-context';
import Blocks from './Blocks';
import Control from './Control';

const Game = () => {

    const { currentPlayer, currentPlayerDispatcher, playerMoves, playerMovesDispatcher, mode, modeDispatcher } = useContext(GameContext);
    const [ result, setResult ] = useState({ endGame: '', winner: '', player: '' });


    const findWinner = (player) => {
        if(playerMoves[player].length > 2) {
            const winnerCode = ['ABC', 'DEF', 'GHI', 'ADG', 'BEH', 'CFI', 'AEI', 'CEG'];
            const isWinner = winnerCode.find((code) => {
                let str1 = code.split('').sort();
                let str2 = playerMoves[player].split('').sort();
                let res  = str1.filter((value) => str2.includes(value));
                return res.length === 3;
            });
            if(isWinner) {
                return setResult({ endGame: true, winner: true, player });
            }
            if((playerMoves.playerOne.length + playerMoves.playerTwo.length) === 9) {
                return setResult({ endGame: true, winner: false, player: 'Draw' });
            }
        }
    };

    const handleModalClose = () => {
        document.querySelector('.start').classList.toggle('disabled');
        document.querySelector('.rest').classList.toggle('disabled');
        document.querySelector('.mode').classList.toggle('disabled');
        currentPlayerDispatcher({ type: 'SET_CURRENT_PLAYER', currentPlayer: '' });
        playerMovesDispatcher({ type: 'REST_PLAYER_MOVES' });
        modeDispatcher({ type: 'SET_MODE', mode: 'multi-player' });
        setResult({
            endGame: '',
            winner: '',
            player: ''
        });
    };

    useEffect(() => {
        if(!!currentPlayer) {
            const prePlayer = currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';
            findWinner(prePlayer);
        } else {
            setResult({ endGame: '', winner: '', player: '' });
        }
    }, [currentPlayer]);

    Modal.setAppElement(document.getElementById('root'));

    return (
        <>
            {/*<h1>{currentPlayer}</h1>*/}
            <div id="game">
                <Blocks />
                <Control />
            </div>
            <Modal
                isOpen={!!result.endGame}
                onRequestClose={handleModalClose}
            >
                { result.winner && <h2>Winner: {(result.player === 'playerTwo' && mode === 'single-mode') ? 'Bot' : result.player}</h2> }
                { !result.winner && <h2>Draw</h2> }
                <p onClick={handleModalClose} className="close-event">Close</p>
            </Modal>
        </>
    );
}

export default Game;