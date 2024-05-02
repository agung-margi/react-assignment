import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deletePost, getPost, postSelectors } from "../redux/slice/postSlice";

function ShowPost() {
  const dispatch = useDispatch();
  const posts = useSelector(postSelectors.selectAll);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPost()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className="box mt-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/add" className="button is-success is-small">
            Add New
          </Link>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <Link to={`/edit/${post.id}`} className="button is-small is-info">
                      Edit
                    </Link>
                    <button onClick={() => dispatch(deletePost(post.id))} className="button is-small is-danger ml-1">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ShowPost;
