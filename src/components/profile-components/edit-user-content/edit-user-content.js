import { Button, Form, Space, Typography } from "antd";
import classes from "./edit-user-content.module.css";
import ProfileForm from "../profile-form/profile-form";
import FormField from "../../UI/form-field/form-field";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const { Text } = Typography;

const width100 = { width: "100%" };

const EditUserForm = ({ onFinish }) => {
  const { user } = useSelector((state) => state.user);
  const renderUsernameField = () => {
    const validateUsername = async (rule, value, callback) => {
      if (!value) {
        callback("Please enter your username");
      } else {
        callback();
      }
    };

    const rules = [{ validator: validateUsername }];

    return (
      <FormField
        title="Username"
        name="username"
        placeholder="Username"
        rules={rules}
        defaultValue={user.username}
      />
    );
  };

  const renderEmailField = () => {
    const validateUsername = async (rule, value, callback) => {
      if (!value) {
        callback("Please enter your username");
      } else {
        callback();
      }
    };

    const rules = [
      { validator: validateUsername },
      { type: "email", message: "Please enter a valid email address" },
    ];

    return (
      <FormField
        title="Email address"
        name="email"
        placeholder="Email address"
        rules={rules}
        defaultValue={user.email}
      />
    );
  };

  const renderNewPasswordField = () => {
    const rules = [
      {
        min: 6,
        max: 40,
        message: "Password must be between 6 and 40 characters",
      },
    ];

    return (
      <FormField
        title="New Password"
        name="password"
        placeholder="New Password"
        rules={rules}
        inputType="password"
      />
    );
  };

  const renderImageField = () => {
    const rules = [
      { type: "url", message: "Please enter a valid URL for the avatar image" },
    ];

    return (
      <FormField
        title="Image"
        name="image"
        placeholder="Image URL"
        rules={rules}
      />
    );
  };

  const renderSaveButton = () => (
    <div>
      <Form.Item style={{ marginBottom: "0" }}>
        <Button type="primary" htmlType="submit" style={width100}>
          Save
        </Button>
      </Form.Item>
      <div>
        <Text className={classes.text}>
          <Link to="/">Back to Home</Link>
        </Text>
      </div>
    </div>
  );

  return (
    <Form name="edit-user" onFinish={onFinish} style={width100}>
      <Space direction="vertical" size="middle" style={width100}>
        {renderUsernameField()}
        {renderEmailField()}
        {renderNewPasswordField()}
        {renderImageField()}
        {renderSaveButton()}
      </Space>
    </Form>
  );
};

const EditUserContent = ({ onFinish }) => {
  return (
    <ProfileForm title="Edit User">
      <EditUserForm onFinish={onFinish} />
    </ProfileForm>
  );
};

EditUserForm.propTypes = {
  onFinish: PropTypes.func
}

EditUserContent.propTypes = {
  onFinish: PropTypes.func
}

export default EditUserContent;
