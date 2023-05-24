import React from 'react';
import {Button, Popconfirm} from "antd";

const DeleteBtn = ({ onDelete }) => {
    return (
        <Popconfirm
            placement="rightTop"
            title={'Are you sure to delete\n this article?'}
            onConfirm={onDelete}
            okText="Yes"
            cancelText="No"
        >
            <Button danger>
                Delete
            </Button>
        </Popconfirm>
    );
};

export default DeleteBtn;
