import { IGlobalState } from 'model/globalState.model';
import { createContext, useContext } from 'react';

const defaultValue = [{} as IGlobalState, undefined];

const GlobalContext = createContext(defaultValue);

export const useGlobalContext = () => {
  const [status, dispatch] = useContext(GlobalContext) as [IGlobalState, any];
  return [status, dispatch];
}

export default GlobalContext;