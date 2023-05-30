import { Button, Form, Space, Typography } from "antd";
import classes from "./edit-user-content.module.css";
import ProfileForm from "../profile-form/profile-form";
import FormField from "../../UI/form-field/form-field";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useState } from "react";
import { handleFinishForForm } from "../../../utility/handle-finish-for-form";

const { Text } = Typography;

const width100 = { width: "100%" };

const EditUserForm = ({ onFinish, formErrors }) => {
  const { user } = useSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinish = async (values) => {
    await handleFinishForForm(values, onFinish, setIsSubmitting);
  };

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
        error={formErrors.username}
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
        error={formErrors.email}
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
        error={formErrors.password}
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
        error={formErrors.image}
      />
    );
  };

  const renderSaveButton = () => (
    <div>
      <Form.Item style={{ marginBottom: "0" }}>
        <Button
          type="primary"
          htmlType="submit"
          style={width100}
          disabled={isSubmitting}
        >
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
    <Form name="edit-user" onFinish={handleFinish} style={width100}>
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

const EditUserContent = ({ onFinish, formErrors }) => {
  return (
    <ProfileForm title="Edit User">
      <EditUserForm onFinish={onFinish} formErrors={formErrors} />
    </ProfileForm>
  );
};

EditUserForm.propTypes = {
  onFinish: PropTypes.func,
  formErrors: PropTypes.object
};

EditUserContent.propTypes = {
  onFinish: PropTypes.func,
  formErrors: PropTypes.object
};

export default EditUserContent;
