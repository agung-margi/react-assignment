import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Modal } from "antd";
import AddPostForm from "./AddPost";
import EditPostForm from "./EditPost";
import { fetchPosts, deleteExistingPost } from "../redux/slice/postsSlice";

const PostList = () => {
  const [editPostId, setEditPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { list, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const capitalizeFirstLetter = (str) => {
    if (str && typeof str === "string" && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span>{capitalizeFirstLetter(text)}</span>,
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      render: (text) => <span>{capitalizeFirstLetter(text)}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button onClick={() => handleEdit(record.id, record.title)} key="edit">
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="danger" key="delete">
            Delete
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    document.title = "Posts with React";
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (postId) => {
    dispatch(deleteExistingPost(postId));
  };

  const handleEdit = (postId, postTitle) => {
    setEditPostId(postId);
  };

  const handleCloseEdit = () => {
    setEditPostId(null);
  };

  const handleAddPost = () => {
    setIsModalOpen(true);
  };

  const handleCloseAddPost = () => {
    setIsModalOpen(false);

    if (status === "loading") {
      return <p>Loading...</p>;
    }

    return (
      <>
        <div>
          <h1>Posts</h1>
          <Button onClick={handleAddPost} type="primary">
            Add Post
          </Button>
        </div>
        <Modal title="Add New Post" open={isModalOpen} onOk={handleAddPost} onCancel={handleCloseAddPost}>
          <AddPostForm onFinish={handleCloseAddPost} />
        </Modal>
        <Table columns={columns} dataSource={list} rowKey="id" />
        <Modal title="Edit Post" open={editPostId !== null} onCancel={handleCloseEdit} footer={null}>
          {editPostId !== null && <EditPostForm postId={editPostId} initialTitle={list.find((post) => post.id === editPostId)?.title || ""} initialBody={list.find((post) => post.id === editPostId)?.body || ""} onFinish={handleCloseEdit} />}
        </Modal>
      </>
    );
  };
};
export default PostList;
