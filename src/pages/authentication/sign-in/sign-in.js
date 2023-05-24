import SignInContent from "../../../components/profile-components/sign-in-content/sign-in-content";
import {setUser} from "../../../reducers/user-reducer";
import {login} from "../../../api/users";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {statusActions} from "../../../reducers/status-reducer";
import {useEffect} from "react";

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleServerResponse = (response) => {
        console.log(response)
        dispatch(setUser(response));
    };

    const onFinish = async (values) => {
        const { email, password } = values
        try {
            dispatch(statusActions.search())
            const res = await login(email, password)
            handleServerResponse(res)
            dispatch(statusActions.ok())
            navigate("/")
        } catch {
            dispatch(statusActions.error())
        }
    };

    useEffect(() => {
        dispatch(statusActions.noStatus())
    }, [])

    return (
        <div>
            <SignInContent onFinish={onFinish} />
        </div>
    );
};

export default SignIn;
