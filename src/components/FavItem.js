import React from "react";
import { useDispatch } from "react-redux";
import { removeFav } from "../actions";
import { removeAll } from "../actions";

function FavItem({id,setup,punchline }) {

  const dispatch=useDispatch();
  return (
    <div>
      <div className="bg-yellow-100 shadow-xl hover:shadow-lg p-3 pl-5 flex justify-between group transition-all">
        <div className="font-mono">
        <div className="flex-1 pr-4 text-xl">{setup}</div>
        <p> {punchline}</p>
        </div>
        <button
          onClick={() => {dispatch(removeFav(id)) }}
          className="transition-all px-3 py-2 text-sm rounded bg-rose-700 text-white opacity-30 group-hover:opacity-100"
        >
        Çıkar
        </button>
     
      </div>
      <div className="mt-5 text-white ">
        <button
        onClick={() => {dispatch(removeAll()) }}
        className="transition-all px-3 py-2 block text-sm rounded bg-rose-700 text-white opacity-30 group-hover:opacity-100"
      >
      Hepsini Çıkar
        </button>
      </div>
    </div>
  );
}

export default FavItem;
