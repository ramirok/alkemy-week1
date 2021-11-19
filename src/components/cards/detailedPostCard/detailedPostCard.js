import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAppState } from "../../../context/appContext";
import classes from "./detailedPostCard.module.css";

const DetailedPostCard = (props) => {
  const { post } = props;
  const { deletePost } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const submitDeletePost = async () => {
    setIsLoading(true);
    const deleted = await deletePost(post.id);
    if (deleted) {
      navigate("/");
    } else {
      setMessage("Failed, please try again");
      setIsLoading(false);
    }
  };

  return (
    <div className={`card mt-4 rounded-0 border-dark shadow ${classes.card}`}>
      <div className="position-absolute end-0 top-0">
        {isLoading && (
          <div className="bg-white d-flex flex-column align-items-center justify-content-center">
            <div className="spinner-grow m-2 rounded-0" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title mt-2 mb-4 text-center">{post.title}</h5>
        <p className="card-text mt-2 mb-4 text-center">{post.body}</p>
        <div className="d-flex justify-content-evenly border border-bottom-0 border-end-0 border-start-0 border-secondary pt-3">
          <Link
            to="edit"
            className="btn btn-dark rounded-0 border-4 text-white p-2 nav-item"
          >
            <i className="bi bi-pen me-2"></i>
            Edit
          </Link>
          <button
            onClick={submitDeletePost}
            className="btn btn-dark rounded-0 border-4 text-white p-2 nav-item"
          >
            <i className="bi bi-x-circle me-2"></i>
            Delete
          </button>
        </div>
        <div className="text-center mt-3" style={{ color: "red" }}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default DetailedPostCard;
