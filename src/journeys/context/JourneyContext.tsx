import React, { useContext, useState } from 'react'
import { createContext } from '@fluentui/react-context-selector';
import { AppContext } from './interfaces';


const StoreContext = createContext<AppContext>({
    appState: undefined,
    dispatch: () => ({})
});


import useStore from './useStore';


const RootProvider = ({ children }: any) => {

  const [appState, dispatch]: [any, any] = useStore();

  return (
    <StoreContext.Provider value={{ appState, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default RootProvider;

export {StoreContext};
