import {
    GET_CHARACTERS,
    GET_CHARACTER_DETAIL,
    GET_EPISODES,
    GET_CHARACTER_BY_NAME,
    FILTER_ORIGIN,
    CLEAR_PAGE
} from './constants'
import axios from 'axios';

export const getCharacters = () => {
    return (dispatch) => {
      axios.get('http://localhost:3001/characters/').then((res) => {
        dispatch({
          type: GET_CHARACTERS,
          payload: res.data,
        });
      });
    };
};

export const getCharacterDetail = (id) => {
    console.log(id)
    return async dispatch => {
      const character = await axios.get(`http://localhost:3001/characters/${id}`)
      return dispatch({
          type: GET_CHARACTER_DETAIL , 
          payload: character.data
        })
    }
};

export const getEpisodes = () => {
    return async (dispatch) => {
      const episodes = await axios.get('http://localhost:3001/episodes/');
      return dispatch({ 
          type: GET_EPISODES, 
          payload: episodes.data 
        });
    };
};

export function getCharacterByName(name) {
  return async function(dispatch) {
      try {
          const character = await axios.get(`http://localhost:3001/characters/?name=${name}`);
          return dispatch({type: GET_CHARACTER_BY_NAME, payload: character.data});
      } catch (error) {
          console.error(error);
      }
  }
};

export const filterOrigin = (payload) => {
  console.log(payload) // all , created , api
  return {
    type: FILTER_ORIGIN,
    payload
  }
};

export const clearPage =() => {
  return{
    type: CLEAR_PAGE,
    
  }
}