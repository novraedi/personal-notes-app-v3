import React from "react";
import { FiCheck } from "react-icons/fi";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function NoteInput({ addNote }) {
  const [title, onTitleChangeEventHandler] = useInput("");
  const [body, setBody] = React.useState("");

  const onSubmitEventHandler = (event) => {
    event.preventDefault();
    addNote({
      title,
      body,
    });
  };
  return (
    <>
      <section className="add-new-page__input">
        <form onSubmit={onSubmitEventHandler}>
          <input
            className="add-new-page__input__title"
            type="text"
            placeholder="Masukan Judul Catatan..."
            required
            value={title}
            onChange={onTitleChangeEventHandler}
          ></input>
          <div
            className="add-new-page__input__body"
            contentEditable="true"
            data-placeholder="Tuliskan catatanmu disini..."
            onInput={(e) => setBody(e.target.innerHTML)}
          ></div>
          <div className="add-new-page__action">
            <button className="action" type="submit" title="Simpan">
              <FiCheck />
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
