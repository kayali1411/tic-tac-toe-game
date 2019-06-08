const currentPlayerReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PLAYER_MOVES':
            return {
                ...state,
                ...action.playerMoves
            };
        default:
            return state;
    }
}

export default currentPlayerReducer;