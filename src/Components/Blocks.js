import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../game-context';

const Blocks = () => {
    const { currentPlayer, currentPlayerDispatcher, playerMoves, playerMovesDispatcher } = useContext(GameContext);

    const [ blocks, setBlocks ] = useState({ A:'', B:'', C:'', D:'', E:'', F:'', G:'', H:'', I:'' });
    const [ error, setError ]   = useState('');

    const squares = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

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

    useEffect(() => {
        if(currentPlayer === '') {
            setBlocks({ A:'', B:'', C:'', D:'', E:'', F:'', G:'', H:'', I:'' });
        }
        setError('');
    }, [currentPlayer]);

    return (
        <div className="container">
            {!!error && <h1 className="msg error-msg">{error}</h1>}
            {!!currentPlayer && <h1 className="msg info-msg">Current Player: {currentPlayer}</h1>}
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