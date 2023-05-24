import {Form, Input} from 'antd';
import Title from "antd/es/typography/Title";

const { TextArea, Password } = Input
const { Item } = Form

const styleInput = {
    width: '100%',
    height: '40px',
    paddingTop: '3px',
};

const styleItem = {
    marginBottom: "0"
}

const styleTitle = {
    marginBottom: "0"
}

const FormField = ({name, placeholder, title, rules, inputType = 'text', defaultValue = '', size}) => {

    const autoSize = size ? {minRows: size} : {minRows: 1, maxRows: 1}

    return (
        <div>
            <Title level={5} style={styleTitle}>{title}</Title>
            <Item
                name={name}
                rules={rules}
                style={styleItem}
                initialValue={defaultValue}
            >
                {
                    inputType === 'password' ? (
                        <Password
                            style={styleInput}
                            placeholder={placeholder}
                        />
                    ) : (
                        <TextArea
                            style={styleInput}
                            placeholder={placeholder}
                            autoSize={autoSize}
                        />
                    )
                }
            </Item>
        </div>
    );
};

export default FormField;
