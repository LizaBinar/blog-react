import { Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import PropTypes from "prop-types";

const { TextArea, Password } = Input;
const { Item } = Form;

const styleInput = {
  width: "100%",
  height: "40px",
  paddingTop: "3px",
};

const styleItem = {
  marginBottom: "0",
};

const styleTitle = {
  marginBottom: "0",
};

const FormField = ({
  name,
  placeholder,
  title,
  rules,
  inputType = "text",
  defaultValue = "",
  size,
  error,
}) => {
  const autoSize = size ? { minRows: size } : { minRows: 1, maxRows: 1 };

  return (
    <div>
      <Title level={5} style={styleTitle}>
        {title}
      </Title>
      <Item
        name={name}
        rules={rules}
        style={styleItem}
        initialValue={defaultValue}
        help={error}
        validateStatus={error ? "error" : ""}
      >
        {inputType === "password" ? (
          <Password style={styleInput} placeholder={placeholder} />
        ) : (
          <TextArea
            style={styleInput}
            placeholder={placeholder}
            autoSize={autoSize}
          />
        )}
      </Item>
    </div>
  );
};

FormField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  rules: PropTypes.array,
  inputType: PropTypes.string,
  defaultValue: PropTypes.string,
  size: PropTypes.number,
  error: PropTypes.string,
};

export default FormField;
