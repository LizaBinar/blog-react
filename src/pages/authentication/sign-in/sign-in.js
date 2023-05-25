import SignInContent from "../../../components/profile-components/sign-in-content/sign-in-content";
import { setUser } from "../../../reducers/user-reducer";
import { login } from "../../../api/users";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { statusActions } from "../../../reducers/status-reducer";
import { useEffect } from "react";
import { checkErrorData } from "../../../utility/check-error-data";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        dispatch(statusActions.myStatus(error.response.data.errors));
      } else {
        dispatch(statusActions.error());
      }
    }
  };

  useEffect(() => {
    dispatch(statusActions.noStatus());
  }, []);

  return (
    <div>
      <SignInContent onFinish={onFinish} />
    </div>
  );
};

export default SignIn;
