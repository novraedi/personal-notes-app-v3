import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

export default function RegisterInput({ register }) {
  const [name, handletName] = useInput("");
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");
  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };
  return (
    <form onSubmit={handleSubmit} className="register-input">
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={handletName}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmail}
        required
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={handlePassword}
      />
      <button>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
