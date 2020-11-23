import * as React from "react";

const ThemeStateContext = React.createContext();
const ThemeDispatchContext = React.createContext();

const initialState = null;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(initialState);

  return (
    <ThemeDispatchContext.Provider value={setTheme}>
      <ThemeStateContext.Provider value={theme}>
        {children}
      </ThemeStateContext.Provider>
    </ThemeDispatchContext.Provider>
  );
};

export const useThemeState = () => React.useContext(ThemeStateContext);
export const useThemeDispatch = () => React.useContext(ThemeDispatchContext);
