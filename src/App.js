import React, { useReducer } from 'react';
import currentPlayerReducer from './Reducers/currentPlayer';
import playerMovesReducer from './Reducers/playerMoves';
import blocksReducer from './Reducers/blocks';
import playeModeReducer from './Reducers/playeMode';

import GameContext from './game-context';
import Game from './Components/Game';


const App = () => {
  const currentPlayerInitialState = '';
  const playModeInitialState = 'multi-player';
  const playerMovesInitialState   = { playerOne: '', playerTwo: '', bot: '' };
  const blocksInitialState        = { A: '', B: '', C: '', D: '', E: '', F: '', G: '', H: '', I: '' };

  const [ currentPlayer, currentPlayerDispatcher ] = useReducer(currentPlayerReducer, currentPlayerInitialState);
  const [ playerMoves, playerMovesDispatcher ]     = useReducer(playerMovesReducer, playerMovesInitialState);
  const [ blocks, blocksDispatcher ]               = useReducer(blocksReducer, blocksInitialState);
  const [ mode, modeDispatcher ]                   = useReducer(playeModeReducer, playModeInitialState);

  const store = {
    currentPlayer,
    currentPlayerDispatcher,
    playerMoves,
    playerMovesDispatcher,
    blocks,
    blocksDispatcher,
    mode,
    modeDispatcher
  };

  return (
      <GameContext.Provider value={store}>
        <Game />
      </GameContext.Provider>
  );
}

export default App;
