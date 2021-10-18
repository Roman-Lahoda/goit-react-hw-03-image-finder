import PropTypes from "prop-types";
import { Component } from "react";

class Searchbar extends Component {
  state = {
    searchQuery: "",
  };

  onInput = (e) => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ searchQuery: "" });
    this.props.onSubmit(this.state.searchQuery.trim());
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.onInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
