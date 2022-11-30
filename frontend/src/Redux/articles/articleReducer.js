import { API_URL } from "../../config";

const INITIAL_STATE = {
    articles: [],
  };
  
  export default function articleReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "ADDARTICLE":
        const newArr = [...state.articles];
        newArr.unshift(action.payload)
        return {
          ...state,
          articles: newArr,
        };
      case "LOADARTICLES": {
        return {
          ...state,
          articles: action.payload,
        };
      }
    }
  
    return state;
  }
  
  export const getArticles = () => (dispatch, getState) => {
    // fetch("http://localhost:4000/api/post")
    fetch( API_URL )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "LOADARTICLES",
          payload: data,
        });
      });
  };
  