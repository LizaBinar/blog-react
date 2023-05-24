import classes from "./form-checkbox.module.css"
import {Checkbox, Form} from "antd";

const styleItem = {
    marginBottom: "0"
}

const FormCheckbox = ({ name, label, rules }) => {

    return (
        <div className={classes.blockCheckbox}>
            <Form.Item style={styleItem} name={name} valuePropName="checked" rules={rules}>
                <Checkbox>{label}</Checkbox>
            </Form.Item>
        </div>
    );
};

export default FormCheckbox
