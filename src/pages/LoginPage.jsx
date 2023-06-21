import React from "react";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import { useContext } from "react";

export default function LoginPage({ loginSuccess }) {
  const { locale } = useContext(LocaleContext);
  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  };
  return (
    <>
      <LoginInput login={onLogin} />
      <p>
        {locale === "id" ? "Belum punya akun?" : "Don't have an account yet?"}{" "}
        <Link to="/register">
          {locale === "id" ? "Daftar di sini." : "Register Here."}
        </Link>
      </p>
    </>
  );
}
