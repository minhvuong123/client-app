import { IGlobalState } from 'model/globalState.model';
import { useReducer } from 'react';
import GlobalContext from './globalContext';
import { globalReducer, inititalState } from './globalReducer';

function GlobalProvider({ children }: any) {
  const [state, dispatch] = useReducer(globalReducer, inititalState) as [IGlobalState, any];

  return (
    <GlobalContext.Provider value={[state, dispatch] }>
      { children }
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;