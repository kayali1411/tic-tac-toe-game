import React, { useContext, useState } from 'react';
import GameContext from '../game-context';

const Blocks = () => {
    const { currentPlayer, currentPlayerDispatcher, playerMoves, playerMovesDispatcher } = useContext(GameContext);
    const [ blocks, setBlocks ] = useState({ A:'', B:'', C:'', D:'', E:'', F:'', G:'', H:'', I:'' })

    const squares = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    const handlePlayerMove = (e) => {
        const nxtPlayer = currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';
        const move = currentPlayer === 'playerOne' ? 'X' : 'O';

        playerMovesDispatcher({ type: 'ADD_PLAYER_MOVES',  playerMoves: { [currentPlayer]: playerMoves[currentPlayer].concat(e.target.id) }});
        currentPlayerDispatcher({ type: 'SET_CURRENT_PLAYER', currentPlayer: nxtPlayer });
        setBlocks({
            ...blocks,
            [e.target.id]: move
        });

    };

    return (
        <>
            {squares.map((square) => (
                <div key={square}>
                    <button id={square} onClick={handlePlayerMove}>Value: {blocks[square]}</button>
                </div>
            ))}
        </>
    );
};

export default Blocks;