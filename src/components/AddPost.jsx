import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { addNewPost } from "../redux/slice/postsSlice";

const AddPostForm = ({ onFinish }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleAddPost = () => {
    dispatch(addNewPost({ title, body }));
    onFinish();
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Title">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Item>
      <Form.Item label="Body">
        <Input.TextArea value={body} onChange={(e) => setBody(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleAddPost}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPostForm;
