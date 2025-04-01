import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface ThemeContextProps {
  theme?: string;
  updateTheme?: boolean;
  setUpdateTheme?: Dispatch<SetStateAction<boolean | undefined>>;
}

const ThemeContext = createContext<ThemeContextProps>({});

function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState<string | undefined>();
  const [updateTheme, setUpdateTheme] = useState<boolean>();

  useEffect(() => {
    const themeFromStorage = localStorage.getItem("theme");
    setTheme(themeFromStorage?.toString());
  }, [updateTheme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, setUpdateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
