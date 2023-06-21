import { showFormattedDate } from "../utils";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import PropTypes from "prop-types";

export default function NoteItem({ id, title, body, createdAt }) {
  return (
    <div className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="note-title__body">{parser(body)}</p>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
