import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuthenticationProtect = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.user);

    console.log(token)
    if (!token) {
        navigate('/sign-in');
    }
};

export default useAuthenticationProtect;
