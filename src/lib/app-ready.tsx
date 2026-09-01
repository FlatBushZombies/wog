"use client";

import { createContext, useContext, useState } from "react";

interface AppReadyContextValue {
  ready: boolean;
  setReady: (value: boolean) => void;
}

const AppReadyContext = createContext<AppReadyContextValue>({
  ready: false,
  setReady: () => {},
});

export function AppReadyProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <AppReadyContext.Provider value={{ ready, setReady }}>{children}</AppReadyContext.Provider>
  );
}

export function useAppReady() {
  return useContext(AppReadyContext);
}
