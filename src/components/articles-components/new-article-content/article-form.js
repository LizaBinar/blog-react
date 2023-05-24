import FormField from "../../UI/form-field/form-field";
import {Button, Form} from "antd";
import classes from "./new-article-content.module.css";
// import TagFormField from "../../UI/tag-form-field/tag-form-field";
import TagForm from "../../UI/tag-form-field/tag-form-field";


const ArticleForm = ({title, description, tagList, body, onFinish}) => {
    const renderTitleField = () => {
        const rules = [
            { required: true, message: 'Please enter the title' },
            { max: 60, message: 'Title must not exceed 60 characters' },
        ];

        return (
            <FormField
                defaultValue={title}
                name="title"
                title="Title"
                placeholder="Enter the title"
                rules={rules}
            />
        );
    };

    const renderShortDescriptionField = () => {
        const rules = [
            {required: true, message: "Please enter the short description"},
        ];

        return (
            <FormField
                name="description"
                title="Description"
                placeholder="Enter the short description"
                defaultValue={description}
                rules={rules}
            />
        );
    };

    const renderTextField = () => {
        const rules = [
            {required: true, message: "Please enter the text"},
        ];

        return (
            <FormField
                defaultValue={body}
                name="body"
                title="Text"
                placeholder="Enter the text"
                size={4}
                rules={rules}
            />
        );
    };

    const renderSubmitButton = () => (
        <Form.Item>
            <Button className={classes.btn} type="primary" htmlType="submit">
                Send
            </Button>
        </Form.Item>
    );

    return (
        <Form onFinish={onFinish}>
            <div className={classes.form}>
                {renderTitleField()}
                {renderShortDescriptionField()}
                {renderTextField()}
                <TagForm defaultValue={tagList} name="tagList" label="Tags"/>
                {renderSubmitButton()}
            </div>
        </Form>
    );
}

export default ArticleForm