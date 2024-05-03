import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { editExistingPost } from "../redux/slice/postsSlice";

const EditPostForm = ({ postId, initialTitle, initialBody, onFinish }) => {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const dispatch = useDispatch();

  const handleEditPost = () => {
    dispatch(editExistingPost({ id: postId, title, body }));
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
        <Button type="primary" onClick={handleEditPost}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPostForm;
