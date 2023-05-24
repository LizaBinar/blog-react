import {Button, Form, Space, Typography} from 'antd';
import classes from "./sign-in-content.module.css"
import ProfileForm from '../profile-form/profile-form';
import FormField from "../../UI/form-field/form-field";
import {Link} from "react-router-dom";

const {Text} = Typography;

const width100 = {width: "100%"}

const SignInForm = ({onFinish}) => {
    const renderEmailField = () => {
        const rules = [
            {required: true, message: 'Please enter your email address'},
            {type: 'email', message: 'Please enter a valid email address'},
        ];

        return (
            <FormField title="Email address" name="email" placeholder="Email address" rules={rules}/>
        );
    };

    const renderPasswordField = () => {
        const rules = [
            {required: true, message: 'Please enter your password'},
        ];

        return (
            <FormField title="Password" name="password" placeholder="Password" rules={rules} inputType="password"/>
        );
    };

    const renderSignInButton = () => (
        <div>
            <Form.Item style={{marginBottom: "0"}}>
                <Button type="primary" htmlType="submit" style={width100}>
                    Sign In
                </Button>
            </Form.Item>
            <div>
                <Text className={classes.text}>
                    Don't have an account? <Link to="/sign-up">Sign Up</Link>.
                </Text>
            </div>
        </div>
    );

    return (
        <Form name="sign-in" onFinish={onFinish} style={width100}>
            <Space
                direction="vertical"
                size="middle"
                style={width100}
            >
                {renderEmailField()}
                {renderPasswordField()}
                {renderSignInButton()}
            </Space>
        </Form>
    );
};

const SignInContent = ({ onFinish }) => {
    return (
        <ProfileForm title="Sign In">
            <SignInForm onFinish={onFinish}/>
        </ProfileForm>
    );
};

export default SignInContent;
