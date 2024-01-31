import { api } from '@/utils/api';
import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { AppStateContext } from '.';

export default function AppStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = api.appState.getAppState.useQuery();

  if (!data) {
    return <Spinner />;
  }

  return (
    <AppStateContext.Provider value={data}>{children}</AppStateContext.Provider>
  );
}
