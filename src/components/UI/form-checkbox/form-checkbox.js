import classes from "./form-checkbox.module.css";
import { Checkbox, Form } from "antd";
import PropTypes from "prop-types";

const styleItem = {
  marginBottom: "0",
};

const FormCheckbox = ({ name, label, rules }) => {
  return (
    <div className={classes.blockCheckbox}>
      <Form.Item
        style={styleItem}
        name={name}
        valuePropName="checked"
        rules={rules}
      >
        <Checkbox>{label}</Checkbox>
      </Form.Item>
    </div>
  );
};

FormCheckbox.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    rules: PropTypes.array,
}

export default FormCheckbox;
