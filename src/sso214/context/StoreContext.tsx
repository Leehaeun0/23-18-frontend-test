import { createContext, PropsWithChildren, useState } from 'react';
import { MenuItem } from '../types/Model';

interface StoreContext {
  menus?: MenuItem;
}

export const StoreContext = createContext<StoreContext | null>(null);

export const StoreProvider = ({
  children,
  initialState,
}: PropsWithChildren<{ initialState?: StoreContext }>) => {
  const [state, setState] = useState(initialState);

  return <StoreContext.Provider value={{ ...state }}>{children}</StoreContext.Provider>;
};
