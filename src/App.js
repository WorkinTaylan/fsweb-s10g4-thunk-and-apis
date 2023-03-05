import React, { useEffect } from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useDispatch,useSelector } from "react-redux";
import { addFav, fetchAnother, getFavsFromLocalStorage} from "./actions";
import { removeAll } from "./actions"; 

export default function App() {
  const dispatch=useDispatch();
  const loading = useSelector((depo)=>depo.loading);
  const current = useSelector((depo)=>depo.current);
  const error=useSelector((depo)=>depo.error);
  const favs = useSelector((depo)=>depo.favs);


  useEffect(() => {
    
    
    dispatch(fetchAnother())
    dispatch(getFavsFromLocalStorage())
    
  }, [dispatch]);

  return (
    <div className="wrapper max-w-xl mx-auto px-4">
     
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 text-yellow-100 hover:text-white "
          activeClassName="shadow-xl text-white"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 text-yellow-100 hover:text-white"
          activeClassName="shadow-xl text-white"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && <div className="bg-yellow-100 font-bold text-red-600 font-mono p-6 text-center shadow-md">HAZIR MISIN?</div>}
          {current && <Item data={current} />}
          {error&& <div>ERROR</div>}
          <div className="flex gap-3 justify-end py-3">
            <button
              onClick={()=>dispatch(fetchAnother())}
              className="select-none px-4 py-2 border border-yellow-100 text-yellow-100 hover:text-white opacity-80 hover:opacity-100"
            >
              Başka bir tane
            </button>
            <button
              disabled={current===null}
              onClick={()=>dispatch(addFav(current))}
              className="select-none px-4 py-2 border border-yellow-100 text-yellow-100  hover:border-yellow-100 hover:text-white opacity-80 hover:opacity-100"
            >
              Favorilere ekle
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0
              ? favs.map((item) => (
                <FavItem key={item.id} id={item.id} setup={item.setup} punchline={item.punchline} />
              ))
              : <div className="bg-red-900 p-6 text-white font-mono text-center shadow-md">Henüz bir favoriniz yok</div>
            }
            <div className="mt-5 text-white ">
        <button
        onClick={() => {dispatch(removeAll()) }}
        className="transition-all px-3 py-2 block text-sm rounded bg-rose-700 text-white opacity-30 group-hover:opacity-100"
      >
      Hepsini Çıkar
        </button>
      </div>
          </div>
        </Route>
      </Switch>
      <ToastContainer autoClose={2000}/>
    </div>
  );
}
