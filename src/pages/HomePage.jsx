import React from "react";
import SearchBar from "../components/SearchBar";
import { getActiveNotes } from "../utils/network-data";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import HomePageAction from "../components/HomePageAction";
import LocaleContext from "../contexts/LocaleContext";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }
  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
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
      return { isLoading: true };
    });
    const { error, data } = await getActiveNotes();
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
    const activeNotes = filteredNotes.filter((note) => note.archived === false);
    return (
      <LocaleContext.Consumer>
        {({ locale }) => {
          return (
            <section>
              <h2>{locale === "id" ? "Catatan Aktif" : "Active Note"}</h2>
              <SearchBar
                keyword={this.state.keyword}
                keywordChange={this.onKeywordChangeHandler}
              />
              <NoteList isLoading={this.state.isLoading} notes={activeNotes} />
              <HomePageAction />
            </section>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
