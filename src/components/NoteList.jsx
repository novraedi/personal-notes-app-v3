import Loader from "./Loader";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

export default function NoteList({ isLoading, notes }) {
  if (isLoading) {
    return <Loader />;
  }
  if (!notes.length) {
    return (
      <section className="notes-list-empty">
        <p className="notes-list__empty">Tidak Ada Catatan</p>
      </section>
    );
  }
  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} {...note} />
      ))}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape(NoteItem.propTypes)).isRequired,
  isLoading: PropTypes.bool,
};
