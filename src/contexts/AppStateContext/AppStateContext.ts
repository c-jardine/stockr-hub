import { type AppState } from '@/types';
import React from 'react';

const AppStateContext = React.createContext<AppState>(null);

export function useAppStateContext() {
  return React.useContext(AppStateContext);
}

export default AppStateContext;
