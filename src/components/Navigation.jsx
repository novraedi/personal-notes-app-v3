import { Link } from "react-router-dom";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineLogout,
  MdTranslate,
  MdOutlineGTranslate,
} from "react-icons/md";
import ThemeContext from "../contexts/ThemeContext";
import LocaleContext from "../contexts/LocaleContext";
import { useContext } from "react";
import PropTypes from "prop-types";

export default function Navigation({ name, logout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);
  if (!name)
    return (
      <>
        <h1>
          <Link to="/">
            {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
          </Link>
        </h1>
        <div className="navigation">
          <ul>
            <li>
              <button onClick={toggleLocale}>
                {locale === "id" ? (
                  <MdOutlineGTranslate size={32} />
                ) : (
                  <MdTranslate size={32} />
                )}
              </button>
            </li>
            <li>
              <button onClick={toggleTheme}>
                {theme === "dark" ? (
                  <MdOutlineLightMode size={32} />
                ) : (
                  <MdOutlineDarkMode size={32} />
                )}
              </button>
            </li>
          </ul>
        </div>
      </>
    );

  return (
    <>
      <h1>
        <Link to="/">{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</Link>
      </h1>
      <div className="navigation">
        <ul>
          <li>
            <Link to="/archives">
              {locale === "id" ? "Terarsip" : "Archived"}
            </Link>
          </li>
          <li>
            <button onClick={toggleLocale}>
              {locale === "id" ? (
                <MdOutlineGTranslate size={32} />
              ) : (
                <MdTranslate size={32} />
              )}
            </button>
          </li>
          <li>
            <button onClick={toggleTheme}>
              {theme === "dark" ? (
                <MdOutlineLightMode size={32} />
              ) : (
                <MdOutlineDarkMode size={32} />
              )}
            </button>
          </li>
          <li>{name}</li>
          <li>
            <MdOutlineLogout onClick={logout} />
          </li>
        </ul>
      </div>
    </>
  );
}

Navigation.propTypes = {
  name: PropTypes.string,
  logout: PropTypes.func,
};
