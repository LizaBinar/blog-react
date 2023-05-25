import classes from "./profile-form.module.css";
import Card from "../../UI/card/card";
import Title from "antd/es/typography/Title";
import PropTypes from "prop-types";

const ProfileForm = ({ title, children }) => {
  return (
    <Card className={classes.form}>
      <Title level={5}>{title}</Title>
      {children}
    </Card>
  );
};



ProfileForm.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}

export default ProfileForm;
