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
        <>
            {!!error && <h1>{error}</h1>}
            <div className="game-blocks row">
                {squares.map((square) => (
                    <div className="column" key={square}>
                        <button className="game-block" id={square} onClick={handlePlayerMove} disabled={!!blocks[square]}>{blocks[square]}</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Blocks;