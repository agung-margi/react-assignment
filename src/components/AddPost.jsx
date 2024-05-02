import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { savePost } from "../redux/slice/postSlice";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createPost = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      await dispatch(savePost({ title, body }));
      navigate("/");
      setLoading(false);
    },
    [dispatch, navigate, title, body]
  );

  return (
    <div className="flex flex-col">
      <form onSubmit={createPost} className="">
        <input type="text" name="title" id="" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <input type="text" name="body" id="" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
        <div>
          {loading && <p>Loading...</p>}
          <button className="">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
