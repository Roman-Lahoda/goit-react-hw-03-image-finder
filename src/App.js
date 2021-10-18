import { Component } from "react";
import "./App.css";
import Button from "./component/Button/Button";
import ImageGallery from "./component/ImageGallery";
import Searchbar from "./component/Searchbar";
import api from "./services/imageApi";
import Loader from "react-loader-spinner";
import Modal from "./component/Modal/Modal";

class App extends Component {
  state = {
    arrayImages: [],
    searchQuery: "",
    currentPage: 0,
    isLoading: false,
    modalOpen: false,
    currentImg: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImage();
    }
  }

  onSubmit = (text) => {
    this.setState({
      searchQuery: text,
      currentPage: 0,
      arrayImages: [],
      isLoading: true,
    });
  };

  fetchImage = () => {
    const { searchQuery, currentPage } = this.state;

    return api.fetchImage(searchQuery, currentPage).then((array) => {
      this.setState((prevState) => ({
        arrayImages: [...prevState.arrayImages, ...array],
        currentPage: currentPage + 1,
        isLoading: false,
      }));

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  onModal = (obj) => {
    this.setState({ currentImg: obj });
    this.toggleModal();
  };

  render() {
    const { arrayImages, currentImg, isLoading, modalOpen } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {arrayImages.length > 0 && (
          <>
            <ImageGallery
              arrayImages={arrayImages}
              onClick={this.onModal}
              imgClick={this.onModal}
            />
            <Button text={"Load more"} func={this.fetchImage} />
          </>
        )}
        {isLoading && (
          <Loader
            className="Loader"
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
          />
        )}
        {modalOpen && (
          <Modal obj={currentImg} onClose={this.toggleModal}>
            <img src={currentImg.largeImageURL} alt={currentImg.tags} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
