import { Component } from "react";
import PropTypes from "prop-types";

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  onBackdropClose = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.onBackdropClose}>
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  obj: PropTypes.object,
  onClose: PropTypes.func,
};

export default Modal;
