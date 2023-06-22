import RegisterInput from "../components/RegisterInput";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/network-data";
import React from "react";
import LocaleContext from "../contexts/LocaleContext";
import ToastNotification from "../components/ToastNotification";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);
  const onRegisterHandler = async (user) => {
    const { error } = await register(user);
    if (!error) {
      navigate("/login");
      ToastNotification("Register Success", "success");
    }
  };
  return (
    <>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {locale === "id" ? "Sudah punya akun?" : "Already have an account?"}
        <Link to="/login">{locale === "id" ? "Masuk aja" : "Login"}</Link>
      </p>
    </>
  );
}
