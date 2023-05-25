import classes from "./tag-form.module.css";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

const convertTagListDefaultValue = (defaultValue) => {
  if (defaultValue === undefined) {
    return [{ key: nanoid(1), tag: "" }];
  }
  return defaultValue.map((tag) => ({
    key: nanoid(1),
    tag: tag,
  }));
};

const TagForm = ({ defaultValue }) => {
  const [tags, setTags] = useState(convertTagListDefaultValue(defaultValue));

  const handleAddTag = () => {
    setTags([...tags, { key: nanoid(1), tag: "" }]);
  };

  const handleRemoveTag = (key) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.key !== key));
  };

  const handleChangeTag = (key, value) => {
    setTags((prevTags) =>
      prevTags.map((tag) => {
        if (tag.key === key) {
          return { ...tag, tag: value };
        }
        return tag;
      })
    );
  };

  const validateTags = (_, value) => {
    if (value.length > 16) {
      return Promise.reject(
        new Error("Tag length must not exceed 16 characters")
      );
    }
    if (tags.filter((tag) => tag.tag === value).length > 1) {
      return Promise.reject(new Error("Tags must be unique"));
    }
    return Promise.resolve();
  };

  const renderTags = () => {
    return tags.map((tag) => {
      return (
        <div className={classes.tag} key={tag.key}>
          <Form.Item
            name={`tag-${tag.key}`}
            initialValue={tag.tag}
            className={classes.marginBottom0}
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please enter a tag",
              },
              { validator: validateTags },
            ]}
          >
            <Input
              placeholder="Tag"
              onChange={(e) => handleChangeTag(tag.key, e.target.value)}
            />
          </Form.Item>
          {tags.length > 1 && (
            <Button type="danger" onClick={() => handleRemoveTag(tag.key)}>
              Remove
            </Button>
          )}
        </div>
      );
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.tags}>{renderTags()}</div>
      <Form.Item className={classes.marginBottom0}>
        <Button type="dashed" onClick={handleAddTag}>
          Add Tag
        </Button>
      </Form.Item>
    </div>
  );
};

TagForm.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object])
}

export const convertObjectToList = (obj) => {
  const result = { ...obj };
  const tagList = [];

  for (const key in result) {
    if (key.startsWith("tag-")) {
      const tagValue = result[key];
      tagList.push(tagValue);
      delete result[key];
    }
  }

  result.tagList = tagList;
  return result;
};

export default TagForm;
