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
  localStorage.setItem("s10g4", JSON.stringify(state));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      if(state.favs.filter(item=> item===action.payload).length<1){
        const newState={
          ...state,
          favs:[...state.favs,action.payload]
        }
        writeFavsToLocalStorage(newState.favs)
        toast.success("Yes!! you have it")
      return newState }
      else{
        return state};
   
    case FAV_REMOVE:
      const removed=state.favs.filter((item)=>item.id!==action.payload)
      writeFavsToLocalStorage(removed)
      toast.warn("Removed it")
        return {
          ...state,
          favs:removed
        }
     case REMOVE_ALL:
      const RemovedAllFavs=[]
      writeFavsToLocalStorage(RemovedAllFavs)
      return {
        ...state,
        favs: RemovedAllFavs,
      }   

    case FETCH_SUCCESS:
      return {
        ...state,
        current:action.payload,
        loading:false
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading:action.payload
      }
    case FETCH_ERROR:
      return {
        ...state,
        error:action.payload,
        loading:action.payload
      }

    case GET_FAVS_FROM_LS:
      let localdenData;
      if(!readFavsFromLocalStorage()){
        localdenData={
          ...state,
          favs:initial.favs
      };
      writeFavsToLocalStorage(initial.favs)}
      else{
      localdenData={
        ...state,
        favs:readFavsFromLocalStorage()
      }}
      return localdenData

    default:
      return state;
  }
}
