import { Button, Form, Space, Typography } from "antd";
import ProfileForm from "../profile-form/profile-form";
import classes from "./sign-up-content.module.css";
import FormField from "../../UI/form-field/form-field";
import FormCheckbox from "../../UI/form-checkbox/form-checkbox";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const { Text } = Typography;

const SignUpForm = ({ onFinish }) => {
  const renderUsernameField = () => {
    const validateUsername = (_, value) => {
      if (value && (value.length < 3 || value.length > 20)) {
        return Promise.reject("Username should be between 3 and 20 characters");
      }
      return Promise.resolve();
    };

    const rules = [
      { required: true, message: "Please enter your username" },
      { validator: validateUsername },
    ];

    return (
      <FormField
        title={"Username"}
        name="username"
        placeholder="Username"
        rules={rules}
      />
    );
  };

  const renderEmailField = () => {
    const rules = [
      { required: true, message: "Please enter your email address" },
      { type: "email", message: "Please enter a valid email address" },
    ];

    return (
      <FormField
        title={"Email"}
        name="email"
        placeholder="Email address"
        rules={rules}
      />
    );
  };

  const renderPasswordField = () => {
    const validatePassword = (_, value) => {
      if (value && value.length < 6) {
        return Promise.reject("Password should be at least 6 characters");
      }
      return Promise.resolve();
    };

    const rules = [
      { required: true, message: "Please enter your password" },
      { validator: validatePassword },
    ];

    return (
      <FormField
        title={"Password"}
        name="password"
        placeholder="Password"
        rules={rules}
        inputType="password"
      />
    );
  };

  const renderRepeatPasswordField = () => {
    const validateRepeatPassword = ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject("Passwords do not match");
      },
    });

    const rules = [
      { required: true, message: "Please repeat your password" },
      validateRepeatPassword,
    ];

    return (
      <FormField
        title={"Repeat Password"}
        name="repeatPassword"
        placeholder="Repeat Password"
        rules={rules}
        inputType="password"
      />
    );
  };

  const renderAgreementCheckbox = () => {
    const validator = (_, value) =>
      value
        ? Promise.resolve()
        : Promise.reject(
            "Please agree to the processing of your personal information"
          );

    const rules = [
      {
        validator: validator,
      },
    ];

    return (
      <FormCheckbox
        name="agreement"
        label="I agree to the processing of my personal information"
        rules={rules}
      />
    );
  };

  const renderCreateButton = () => (
    <div className={classes.btnBlock}>
      <Form.Item style={{ marginBottom: "0" }}>
        <Button className={classes.btn} type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
      <div>
        <Text className={classes.text}>
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </Text>
      </div>
    </div>
  );
  return (
    <Form name="sign-up" initialValues={{ remember: true }} onFinish={onFinish}>
      <Space direction="vertical" size="middle">
        {renderUsernameField()}
        {renderEmailField()}
        {renderPasswordField()}
        {renderRepeatPasswordField()}
        {renderAgreementCheckbox()}
        {renderCreateButton()}
      </Space>
    </Form>
  );
};

const SignUpContent = ({ onFinish }) => {
  return (
    <ProfileForm title={"Create new account"}>
      <SignUpForm onFinish={onFinish} />
    </ProfileForm>
  );
};

SignUpForm.propTypes = {
  onFinish: PropTypes.func,
};

SignUpContent.propTypes = {
  onFinish: PropTypes.func,
};

export default SignUpContent;
