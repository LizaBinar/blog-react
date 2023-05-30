import classes from "./card.module.css";
import PropTypes from "prop-types";

const Card = ({ children, className }) => {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
