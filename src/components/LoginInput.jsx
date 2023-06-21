import React from "react";
import useInput from "../hooks/useInput";

export default function LoginInput({ login }) {
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");

  function onSubmitHandler(event) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <form className="login-input" onSubmit={onSubmitHandler}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChangeHandler}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChangeHandler}
      />
      <button>Login</button>
    </form>
  );
}
