import * as actionTypes from './actions';

const intialState = {
    ingredients: null,
    totalPrice: 4,
}

const reducer= (state = intialState, action) => {
    return {
        state,
    }
}

export default reducer;