const currentPlayerReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PLAYER':
            return action.currentPlayer;
        default:
            return state;
    }
}

export default currentPlayerReducer;