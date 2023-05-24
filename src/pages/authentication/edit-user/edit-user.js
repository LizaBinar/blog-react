import EditUserContent from "../../../components/profile-components/edit-user-content/edit-user-content";
import useAuthenticationProtect from "../../../hooks/use-authentication-protect";
import {getUser, updateUser} from "../../../api/users";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../reducers/user-reducer";
import {statusActions} from "../../../reducers/status-reducer";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const EditUser = () => {
    useAuthenticationProtect()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const onFinish = async (value) => {
        try {
            dispatch(statusActions.search())
            const userData = {
                username: value.username,
                email: value.email,
                password: value.password,
                image: value.image,
            };
            if (value.password) {
                userData.password = value.password
            }
            if (value.image) {
                userData.image = value.image
            }
            const res = await updateUser(userData)
            console.log(res)
            dispatch(setUser(res));
            navigate("/")
        } catch {
            dispatch(statusActions.error())
        }
    }

    useEffect(() => {
        statusActions.noStatus()
    }, [])

    return (
        <div>
            <EditUserContent onFinish={onFinish} />
        </div>
    );
};

export default EditUser;