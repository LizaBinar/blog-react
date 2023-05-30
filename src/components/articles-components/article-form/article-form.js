import FormField from "../../UI/form-field/form-field";
import { Button, Form } from "antd";
import classes from "./article-form.module.css";
import TagForm from "../../UI/tag-form/tag-form";
import PropTypes from "prop-types";
import {useState} from "react";
import {handleFinishForForm} from "../../../utility/handle-finish-for-form";

const ArticleForm = ({ title, description, tagList, body, onFinish }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinish = async (values) => {
    await handleFinishForForm(values, onFinish, setIsSubmitting)
  }

  const renderTitleField = () => {
    const rules = [
      { required: true, message: "Please enter the title" },
      { max: 60, message: "Title must not exceed 60 characters" },
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
      { required: true, message: "Please enter the short description" },
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
    const rules = [{ required: true, message: "Please enter the text" }];

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
      <Button className={classes.btn} type="primary" htmlType="submit" disabled={isSubmitting}>
        Send
      </Button>
    </Form.Item>
  );

  return (
    <Form onFinish={handleFinish}>
      <div className={classes.form}>
        {renderTitleField()}
        {renderShortDescriptionField()}
        {renderTextField()}
        <TagForm defaultValue={tagList} name="tagList" label="Tags" />
        {renderSubmitButton()}
      </div>
    </Form>
  );
};

ArticleForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  tagList: PropTypes.array,
  body: PropTypes.string,
  onFinish: PropTypes.func,
};

export default ArticleForm;
