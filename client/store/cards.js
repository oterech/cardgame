import axios from 'axios'
import history from '../history'
const ALL_CARDS = "ALL_CARDS"

export const allCards = (cards) => {
    return {
      type: ALL_CARDS,
      cards,
    };
  };

export const fetchCards = () => {
    return async (dispatch) => {
      try {
      const {data} = await axios.get("/api/cards")
      dispatch(allCards(data))
    } catch (err) {
      console.log(err)
    }
  }
  };

export default function(state = [], action) {
    switch (action.type) {
        case ALL_CARDS: 
        return action.cards
      default:
        return state
    }
  }