const currentPlayerReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PLAYER_MOVES':
            return {
                ...state,
                [action.player]: action.moves
            };
        case 'REST_PLAYER_MOVES':
            return {
                playerOne: '',
                playerTwo: ''
            }
        default:
            return state;
    }
}

export default currentPlayerReducer;