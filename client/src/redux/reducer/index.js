import {
    GET_CHARACTERS,
    GET_CHARACTER_DETAIL,
    GET_EPISODES,
    GET_CHARACTER_BY_NAME,
    FILTER_ORIGIN,
    CLEAR_PAGE,
} from '../actions/constants';

const initialState = {
    characters: [], //ESTADO ORIGINAL, NUNCA VA A MUTAR
    filteredCharacters: [], //ESTADO QUE FILTRAMOS, MUTA
    episodes: [],
    characterDetails: undefined,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHARACTERS:
            return {
                ...state,
                characters: action.payload
            };
        case GET_CHARACTER_DETAIL:
            return {
                ...state,
                characterDetails: action.payload,
            };
        case GET_EPISODES: 
            return {
                ...state,
                episodes: action.payload
            };
        case GET_CHARACTER_BY_NAME: 
            return {
                ...state,
                filteredCharacters: action.payload
            };
        case FILTER_ORIGIN:
            const allCharacters = state.characters;
            const originFilteredCharacters =
        action.payload === 'created'
          ? allCharacters.filter((character) => character.created) //VIENE POR BASE DE DATOS
          : allCharacters.filter((character) => !character.created); //VIENE DESDE LA API

            return {
                ...state,
                filteredCharacters: action.payload === 'all' ? allCharacters : originFilteredCharacters,
            };

        case CLEAR_PAGE:
        return {
            ...state,
            characterDetail: undefined,
        };
            default:
                return state;
    };
};


export default rootReducer;