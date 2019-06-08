const blocks = (state, action) => {
    switch (action.type) {
        case 'ADD_BLOCK_VALUE':
            return {
                ...state,
                ...action.blockValue
            };
        default:
            return state;
    }
}

export default blocks;