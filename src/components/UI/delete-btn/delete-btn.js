import React from "react";
import { Button, Popconfirm } from "antd";
import PropTypes from "prop-types";

const DeleteBtn = ({ onDelete }) => {
  return (
    <Popconfirm
      placement="rightTop"
      title={"Are you sure to delete\n this article?"}
      onConfirm={onDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  );
};

DeleteBtn.propTypes = {
  onDelete: PropTypes.func,
};

export default DeleteBtn;
