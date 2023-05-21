import { message } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";

const key = "updatable";

const loading = {
    key,
    type: "loading",
    content: "Ищу...",
    duration: 35,
};

const success = {
    key,
    type: "success",
    content: "Готово",
    duration: 2,
};

const error = {
    key,
    type: "error",
    content: "Ошибка =(",
    duration: 2,
};

const getObj = (status) => {
    switch (status) {
        case "search":
            return loading;
        case "ok":
            return success;
        case "error":
            return error;
        default:
            return loading
    }
};

const SearchStatus = ({ status }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const obj = getObj(status);

    const openMessage = () => {
        messageApi.open(obj);
    };

    useEffect(() => {
        openMessage();
    }, [status]);

    return <>{contextHolder}</>;
};

SearchStatus.propTypes = {
    status: PropTypes.string,
};

export default SearchStatus;
