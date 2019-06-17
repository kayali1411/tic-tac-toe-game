const playModeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MODE':
            return action.mode;
        default:
            return state;
    }
}

export default playModeReducer;