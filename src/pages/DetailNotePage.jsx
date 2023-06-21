import React, { Component } from "react";
import NoteDetail from "../components/NoteDetail";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  deleteNote,
  getNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";
import PageNotFound from "./PageNotFound";
import Loader from "../components/Loader";

function DetailNotePageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <DetailNotePage id={id} navigate={navigate} />;
}

class DetailNotePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      isLoading: true,
    };
    this.onDeleteNotesHandler = this.onDeleteNotesHandler.bind(this);
    this.onArchiveNotesHandler = this.onArchiveNotesHandler.bind(this);
    this.onUnarchiveNotesHandler = this.onUnarchiveNotesHandler.bind(this);
  }
  componentDidMount() {
    this.loadData(this.props.id);
  }
  loadData = async (id) => {
    this.setState(() => {
      return {
        isLoading: true,
      };
    });

    const { data } = await getNote(id);
    this.setState(() => {
      return {
        notes: data,
        isLoading: false,
      };
    });
  };

  async onDeleteNotesHandler(id) {
    await deleteNote(id);
    this.props.navigate("/");
  }
  async onArchiveNotesHandler(id) {
    await archiveNote(id);
    this.props.navigate("/");
  }
  async onUnarchiveNotesHandler(id) {
    await unarchiveNote(id);
    this.props.navigate("/archives");
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    if (this.state.notes === "") {
      return <p>Catatan tidak ditemukan</p>;
    }

    if (this.state.notes === null) {
      return <PageNotFound />;
    }
    return (
      <>
        <NoteDetail
          onDelete={this.onDeleteNotesHandler}
          onArchive={this.onArchiveNotesHandler}
          onUnarchive={this.onUnarchiveNotesHandler}
          {...this.state.notes}
        />
      </>
    );
  }
}

DetailNotePage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailNotePageWrapper;
