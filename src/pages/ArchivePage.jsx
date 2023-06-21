import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { getArchivedNotes } from "../utils/network-data";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../components/Loader";

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  function changeSearchParams(keyword) {
    setSearchParams({
      keyword,
    });
  }

  return (
    <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class ArchivePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || "",
      isLoading: true,
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }
  async componentDidMount() {
    this.setState(() => {
      return {
        isLoading: true,
      };
    });
    const { error, data } = await getArchivedNotes();
    if (!error) {
      this.setState(() => {
        return {
          notes: data,
          isLoading: false,
        };
      });
    }
  }
  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const filteredNotes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    const archivedNotes = filteredNotes.filter(
      (note) => note.archived === true
    );

    if (this.state.isLoading) {
      return <Loader />;
    }

    return (
      <section className="archives-page">
        <h2>Catatan Arsip </h2>
        <SearchBar
          keyword={this.state.keyword}
          keywordChange={this.onKeywordChangeHandler}
        />
        <NoteList notes={archivedNotes} />
      </section>
    );
  }
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default ArchivePageWrapper;
