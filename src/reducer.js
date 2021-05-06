import initialState from './initialState';

function reducer(state, action) {
    switch (action.type) {
        case 'SET_USER': return {
            ...state,
            token: action.data.token,
            user: action.data.user
        };
        case 'SET_ALL': return {
            ...state,
            loading: false,
            all: action.data
        };
        case 'SET_MINE': return {
            ...state,
            loading: false,
            mine: action.data
        };
        case 'FETCH_INIT': return {
            ...state,
            loading: true,
            error: null
        };
        case 'FETCH_ERROR': return {
            ...state,
            loading: false,
            error: action.data
        };
        case 'ADD_QUOTE': return {
            ...state,
            mine: [...state.mine, action.data]
        };
        case 'LOGOUT' : return initialState;
        default: return state;
    }
}

export default reducer;