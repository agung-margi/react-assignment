import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, postSelectors, updatePost } from "../redux/slice/postSlice";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const post = useSelector((state) => postSelectors.selectById(state, id));

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(updatePost({ id, title, body }));
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleUpdate} className="">
        <input type="text" name="title" id="" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <input type="text" name="body" id="" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
        <div>
          {loading && <p>Loading...</p>}
          <button className="">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
