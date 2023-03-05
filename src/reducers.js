import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FAV_ADD,
  FAV_REMOVE,
  REMOVE_ALL,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      let newFav={
        id:action.payload.id,
        setup:action.payload.setup,
        punchline:action.payload.punchline
      }
      if(state.favs.some((joke)=>joke.id===newFav.id)){
        return state
      }
      const updatedFavs=[...state.favs, newFav]; //...states olmazsa sadece eklemek istediğini basıyo ve önceden listeye atılanları göstermiyo. Liste hep 1 elemanlı.
      writeFavsToLocalStorage({favs:updatedFavs})
      toast.success("Yes!! you have it")
      return {
        ...state,
      favs:updatedFavs,
      };

    case FAV_REMOVE:
      const removed=state.favs.filter((item)=>item.id!==action.payload)
      writeFavsToLocalStorage({favs:removed})
      toast.warn("Removed it")
        return {
          ...state,
          favs:removed
        }
     case REMOVE_ALL:
      const RemovedAllFavs=[]
      writeFavsToLocalStorage({favs:RemovedAllFavs})
      return {
        ...state,
        favs: RemovedAllFavs,
      }   

    case FETCH_SUCCESS:
      return {
        ...state,
        current:action.payload
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading:action.payload
      }
    case FETCH_ERROR:
      return {
        ...state,
        error:action.payload
      }

    case GET_FAVS_FROM_LS:
      return {...state, favs:readFavsFromLocalStorage()}

    default:
      return state;
  }
}
