import EditUserContent from "../../../components/profile-components/edit-user-content/edit-user-content";
import useAuthenticationProtect from "../../../hooks/use-authentication-protect";
import { updateUser } from "../../../api/users";
import { useDispatch } from "react-redux";
import { setUser } from "../../../reducers/user-reducer";
import { statusActions } from "../../../reducers/status-reducer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkErrorData } from "../../../utility/check-error-data";

const EditUser = () => {
  useAuthenticationProtect();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});

  const onFinish = async (value) => {
    try {
      dispatch(statusActions.search());
      const userData = {
        username: value.username,
        email: value.email,
      };
      if (value.password) {
        userData.password = value.password;
      }
      if (value.image) {
        userData.image = value.image;
      }
      const res = await updateUser(userData);
      dispatch(setUser(res));
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

  useEffect(() => {
    statusActions.noStatus();
  }, []);

  return (
    <div>
      <EditUserContent onFinish={onFinish} formErrors={formErrors} />
    </div>
  );
};

export default EditUser;
