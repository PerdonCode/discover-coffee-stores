import { createContext, useReducer } from "react";
import "../styles/globals.css";

// global store of value using context
export const StoreContext = createContext();

const ACTION_TYPES = {
  SET_LAT_LONG : 'SET_LAT_LONG',
  SET_COFFEE_STORES : 'SET_COFFEE_STORES',
}

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:{
      return {
        ...state, latLong: action.payload.latLong
      };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return {
        ...state, coffeeStores: action.payload.coffeeStores
      };
    }
    default:
      throw new Error(`unhandled action type: ${action.type}`)
  }
}


const StoreProvider = ({children}) =>  {
  const initialState ={
    latLong: "",
    coffeStores: [],
  }

  const [state, dispatch] = useReducer(storeReducer, initialState)

  return(
  <StoreContext.Provider value={{state, dispatch }} >
  {children}
  </StoreContext.Provider>
  )
}

function MyApp({ Component, pageProps }) {
  return( 
    <div>
      <span>header</span>
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
    </div>
  );
}

export default MyApp;
