import PropTypes from "prop-types";

const Button = ({ text, func }) => {
  return (
    <button type="buttton" onClick={func} className="Button">
      {text}
    </button>
  );
};

export default Button;
