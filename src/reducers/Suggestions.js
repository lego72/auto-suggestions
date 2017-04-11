import { SUGGESTIONS_FETCHED,SUGGESTIONS_FETCHING } from '../constants/Suggestions'
const initialState = {
    suggestions: [],
    fetching   : false
}

export default function events(state = initialState, action = {}) {
    switch (action.type) {
        case SUGGESTIONS_FETCHING:
            return {...state, fetching: true}
        case SUGGESTIONS_FETCHED:{
            const { payload } = action
            return {...state, fetching: false, ...payload}
        }
        default:
            return state;
    }
}



