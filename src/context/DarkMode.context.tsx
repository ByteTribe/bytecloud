import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
  isDarkMode: boolean;
}

type AppAction = { type: 'TOGGLE_DARK_MODE' };

interface DarkModeContextType extends AppState {
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, isDarkMode: !state.isDarkMode };
    default:
      return state;
  }
};

export const DarkModeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, { isDarkMode: false });

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <DarkModeContext.Provider value={{ ...state, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkModeContext must be used within an DarkModeContextProvider');
  }
  return context;
};