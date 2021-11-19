import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppState } from "../../context/appContext";
import LoadingCard from "../../components/cards/loadingCard/loadingCard";
import EmptyCard from "../../components/cards/emptycard/emptyCard";
import FormContainer, {
  MyTextArea,
} from "../../components/formContainer/formContainer";

const EditPage = () => {
  const { id } = useParams();

  const { posts, editPost } = useAppState();
  const [message, setMessage] = useState({ succeed: false, message: "" });
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true); // initial loading animation
  const [isUpdating, setIsUpdating] = useState(false); // updating post loading animation

  const submitEdit = async (values, { setSubmitting }) => {
    try {
      setMessage({ succeed: false, message: "" });
      setIsUpdating(true);
      await editPost({
        id,
        title: values.title,
        body: values.body,
        userId: post.userId,
      });
      setSubmitting(false);
      setMessage({ succeed: true, message: "Post successfully edited" });

      setIsUpdating(false);
    } catch (error) {
      // network error
      setMessage({ succeed: false, message: "Failed, please try again" });
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (posts.length > 0) {
      const found = posts.find((post) => +post.id === +id);
      if (found) {
        /*  This fetch is just to simulate the request time, then set the local state if the post is found in the global state.
            This is because there may be new user-created posts that will not exist in jsonplaceholder api */
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then((res) => res.json())
          .then((_) => {
            setPost(found);
            setIsLoading(false);
          });
      }
    }
  }, [id, posts]);

  return (
    <div className={`d-flex flex-column align-items-center`}>
      <h3 className="mt-4">Edit Post</h3>
      {isLoading ? (
        <LoadingCard />
      ) : !post.id ? (
        <EmptyCard />
      ) : (
        <FormContainer
          submitForm={submitEdit}
          values={{
            title: post.title,
            body: post.body,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Title is required";
            }
            if (!values.body) {
              errors.body = "Body is required";
            }
            return errors;
          }}
        >
          <MyTextArea
            label="Title"
            name="title"
            type="text"
            placeholder="New Post..."
          />
          <MyTextArea
            label="Body"
            name="body"
            type="text"
            placeholder="New Body..."
          />
          {isUpdating && (
            <div className="bg-white bg-opacity-75 position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center">
              <LoadingCard />
            </div>
          )}
        </FormContainer>
      )}
      <div className="mt-5 mb-5">
        <div className={message.succeed ? "text-success" : "text-danger"}>
          {message.message}
        </div>
        {message.succeed && (
          <Link
            to="/"
            className="w-100 btn btn-lg btn-dark rounded-0 border-0 mt-4"
          >
            Back To Home
          </Link>
        )}
      </div>
    </div>
  );
};

export default EditPage;
