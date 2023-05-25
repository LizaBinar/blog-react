import { message } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";

const key = "updatable";

const loading = {
  key,
  type: "loading",
  content: "Loading...",
  duration: 35,
};

const success = {
  key,
  type: "success",
  content: "Success",
  duration: 2,
};

const error = {
  key,
  type: "error",
  content: "Fuck Error =(",
  duration: 2,
};

const nullMessage = {
  key,
  type: "error",
  content: "Ошибка объявлений",
  duration: 3,
};

const myMessage = (string) => {
  return {
    key,
    type: "error",
    content: string,
    duration: 5,
  };
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
      return nullMessage;
  }
};

const SearchStatus = ({ status }) => {
  const [messageApi, contextHolder] = message.useMessage();
  let obj = getObj(status);

  if (obj === nullMessage && status !== "") {
    obj = myMessage(status);
  }

  const openMessage = () => {
    if (status !== "") {
      messageApi.open(obj);
    }
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
