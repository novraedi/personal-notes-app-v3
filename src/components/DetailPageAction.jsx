import React from "react";
import { MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import { BiTrashAlt } from "react-icons/bi";
import PropTypes from "prop-types";

export default function DetailPageAction({
  id,
  archived,
  onDelete,
  onArchive,
  onUnarchive,
}) {
  return (
    <div className="detail-page__action">
      {archived ? (
        <button
          className="action"
          type="button"
          title="Pindahkan"
          onClick={() => onUnarchive(id)}
        >
          <MdOutlineUnarchive />
        </button>
      ) : (
        <button
          className="action"
          type="button"
          title="Arsipkan"
          onClick={() => onArchive(id)}
        >
          <MdOutlineArchive />
        </button>
      )}
      <button
        className="action"
        type="button"
        title="Hapus"
        onClick={() => onDelete(id)}
      >
        <BiTrashAlt />
      </button>
    </div>
  );
}

DetailPageAction.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};
