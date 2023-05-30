import { Button, Form, Space, Typography } from "antd";
import classes from "./sign-in-content.module.css";
import ProfileForm from "../profile-form/profile-form";
import FormField from "../../UI/form-field/form-field";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { handleFinishForForm } from "../../../utility/handle-finish-for-form";

const { Text } = Typography;

const width100 = { width: "100%" };

const SignInForm = ({ onFinish, formErrors }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinish = async (values) => {
    await handleFinishForForm(values, onFinish, setIsSubmitting);
  };

  const renderEmailField = () => {
    const rules = [
      { required: true, message: "Please enter your email address" },
      { type: "email", message: "Please enter a valid email address" },
    ];

    return (
      <FormField
        title="Email address"
        name="email"
        placeholder="Email address"
        rules={rules}
        error={formErrors.email}
      />
    );
  };

  const renderPasswordField = () => {
    const rules = [{ required: true, message: "Please enter your password" }];

    return (
      <FormField
        title="Password"
        name="password"
        placeholder="Password"
        rules={rules}
        inputType="password"
        error={formErrors.password}
      />
    );
  };

  const renderSignInButton = () => (
    <div>
      <Form.Item style={{ marginBottom: "0" }}>
        <Button
          type="primary"
          htmlType="submit"
          style={width100}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </Form.Item>
      <div>
        <Text className={classes.text}>
          Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>.
        </Text>
      </div>
    </div>
  );

  return (
    <Form name="sign-in" onFinish={handleFinish} style={width100}>
      <Space direction="vertical" size="middle" style={width100}>
        {renderEmailField()}
        {renderPasswordField()}
        {renderSignInButton()}
      </Space>
    </Form>
  );
};

const SignInContent = ({ onFinish, formErrors }) => {
  return (
    <ProfileForm title="Sign In">
      <SignInForm onFinish={onFinish} formErrors={formErrors} />
    </ProfileForm>
  );
};

SignInForm.propTypes = {
  onFinish: PropTypes.func,
  formErrors: PropTypes.object,
};

SignInContent.propTypes = {
  onFinish: PropTypes.func,
  formErrors: PropTypes.object,
};

export default SignInContent;
