import SignUpContent from "../../../components/profile-components/sign-up-content/sign-up-content";
import { createUser } from "../../../api/users";
import { setUser } from "../../../reducers/user-reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { statusActions } from "../../../reducers/status-reducer";
import { checkErrorData } from "../../../utility/check-error-data";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleServerResponse = (response) => {
    dispatch(setUser(response));
  };

  const onFinish = async (values) => {
    const { username, email, password } = values;
    try {
      dispatch(statusActions.search());
      const res = await createUser(username, email, password);
      handleServerResponse(res);
      navigate("/");
      dispatch(statusActions.ok());
    } catch (error) {
      if (checkErrorData(error)) {
        dispatch(statusActions.myStatus(error.response.data.errors));
      } else {
        dispatch(statusActions.error());
      }
    }
  };

  return (
    <div>
      <SignUpContent onFinish={onFinish} />
    </div>
  );
};

export default SignUp;
