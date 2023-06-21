import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePageWrapper from "./pages/HomePage";
import DetailNotePageWrapper from "./pages/DetailNotePage";
import PageNotFound from "./pages/PageNotFound";
import AddNotePage from "./pages/AddNotePage";
import ArchivePageWrapper from "./pages/ArchivePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import ThemeContext from "./contexts/ThemeContext";
import LocaleContext from "./contexts/LocaleContext";

function App() {
  const [auth, setAuth] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem("locale") || "id";
  });
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getUserLogged();
      setAuth(data);
      setInitializing(false);
    };

    getData();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setAuth(data);
  };
  const onLogout = () => {
    setAuth(null);
    putAccessToken("");
    navigate("/");
  };
  if (initializing) {
    return null;
  }

  if (auth === null) {
    return (
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <div className="app-container">
            <header>
              <Navigation />
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className="app-container">
          <header>
            <Navigation logout={onLogout} name={auth.name} />
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<PageNotFound />} />
              <Route path="/" element={<HomePageWrapper />} />
              <Route path="/notes/:id" element={<DetailNotePageWrapper />} />
              <Route path="/archives" element={<ArchivePageWrapper />} />
              <Route path="/notes/new" element={<AddNotePage />} />
            </Routes>
          </main>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
