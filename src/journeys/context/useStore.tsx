
import { useReducer } from 'react';

import rootReducer from "../../reducers/RootReducer";
import { getInitialState } from './initialState';


function useStore() {
  return useReducer(rootReducer, getInitialState());
}

export default useStore;

