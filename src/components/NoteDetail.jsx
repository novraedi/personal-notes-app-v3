import { showFormattedDate } from "../utils";
import DetailPageAction from "./DetailPageAction";
import PropTypes from "prop-types";

export default function NoteDetail({
  title,
  body,
  createdAt,
  id,
  archived,
  onDelete,
  onArchive,
  onUnarchive,
}) {
  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{body}</div>
      <DetailPageAction
        id={id}
        onDelete={onDelete}
        archived={archived}
        onArchive={onArchive}
        onUnarchive={onUnarchive}
      />
    </section>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};
