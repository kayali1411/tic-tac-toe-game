import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../game-context';

import Bot from '../bot';

const Blocks = () => {
    const { currentPlayer, currentPlayerDispatcher, playerMoves, playerMovesDispatcher, mode } = useContext(GameContext);

    const [ blocks, setBlocks ] = useState({ A:'', B:'', C:'', D:'', E:'', F:'', G:'', H:'', I:'' });
    const [ error, setError ]   = useState('');

    const squares = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    let bot = new Bot();

    const handlePlayerMove = (e) => {
        if(!!currentPlayer) {
            const nxtPlayer = currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';
            const move = currentPlayer === 'playerOne' ? 'X' : 'O';

            playerMovesDispatcher({
                type: 'ADD_PLAYER_MOVES',
                player: currentPlayer,
                moves: playerMoves[currentPlayer].concat(e.target.id)
            });

            currentPlayerDispatcher({ type: 'SET_CURRENT_PLAYER', currentPlayer: nxtPlayer });

            setBlocks({
                ...blocks,
                [e.target.id]: move
            });

            setError('');
        } else {
            setError('Alert: Please click on start game button!');
        }
    };

    const handleBotMove = () => {
        bot.updateAvailableMoves(playerMoves);
        bot.findMove(playerMoves.playerTwo);
        bot.blockPlayer(playerMoves.playerOne);
        const move = bot.getNxtMove();
        if(move) {
            playerMovesDispatcher({ type: 'ADD_PLAYER_MOVES', player: 'playerTwo', moves: playerMoves.playerTwo.concat(move) });
            setBlocks({ ...blocks, [move]: 'O' });
            currentPlayerDispatcher({ type: 'SET_CURRENT_PLAYER', currentPlayer: 'playerOne' });
        }
    };

    useEffect(() => {
        if(currentPlayer === '') {
            setBlocks({ A:'', B:'', C:'', D:'', E:'', F:'', G:'', H:'', I:'' });
        }
        if(currentPlayer === 'playerTwo' && mode === 'single-mode') {
            setTimeout(handleBotMove, 100);
        }
        setError('');
    }, [currentPlayer]);

    return (
        <div className="container">
            {!!error && <h1 className="msg error-msg">{error}</h1>}
            {!!currentPlayer && <h1 className="msg info-msg">Current Player: {(currentPlayer === 'playerTwo' && mode === 'single-mode') ? 'Bot' : currentPlayer}</h1>}
            <div id="game-blocks" className="box-shadow">
                {squares.map((square) => (
                    <div className="block" key={square}>
                        <button className="square" id={square} onClick={handlePlayerMove} disabled={!!blocks[square]}>{blocks[square]}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blocks;