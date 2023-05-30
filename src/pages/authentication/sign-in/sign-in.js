import SignInContent from "../../../components/profile-components/sign-in-content/sign-in-content";
import { setUser } from "../../../reducers/user-reducer";
import { login } from "../../../api/users";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { statusActions } from "../../../reducers/status-reducer";
import { useState } from "react";
import { checkErrorData } from "../../../utility/check-error-data";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});

  const handleServerResponse = (response) => {
    dispatch(setUser(response));
  };

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      dispatch(statusActions.search());
      const res = await login(email, password);
      handleServerResponse(res);
      dispatch(statusActions.ok());
      navigate("/");
    } catch (error) {
      if (checkErrorData(error)) {
        const { errors } = error.response.data;
        setFormErrors(errors);
        dispatch(statusActions.myStatus(errors));
      } else {
        dispatch(statusActions.error());
      }
    }
  };

  return (
    <div>
      <SignInContent onFinish={onFinish} formErrors={formErrors} />
    </div>
  );
};

export default SignIn;
