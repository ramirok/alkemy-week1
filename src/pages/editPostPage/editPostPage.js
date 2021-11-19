import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppState } from "../../context/appContext";
import LoadingCard from "../../components/cards/loadingCard/loadingCard";
import EmptyCard from "../../components/cards/emptycard/emptyCard";
import FormContainer, {
  MyTextArea,
} from "../../components/formContainer/formContainer";

const EditPage = () => {
  const { posts, editPost } = useAppState();
  const { id } = useParams();
  const [message, setMessage] = useState({ succeed: false, message: "" });
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittin, setIsSubmittin] = useState(false);

  const submitEdit = async (values, { setSubmitting }) => {
    setMessage({ succeed: false, message: "" });
    setIsSubmittin(true);
    const editedSucceed = await editPost({
      id,
      title: values.title || post.title,
      body: values.body || post.body,
      userId: post.userId,
    });
    if (editedSucceed) {
      setSubmitting(false);
      setMessage({ succeed: true, message: "Post successfully edited" });
    } else {
      setMessage({ succeed: false, message: "Failed, please try again" });
    }
    setIsSubmittin(false);
  };

  useEffect(() => {
    if (posts.length > 0) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.json())
        .then((_) => {
          const found = posts.find((post) => post.id === +id);
          if (found) {
            setPost(found);
          }
          setIsLoading(false);
        });
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
          {isSubmittin && (
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
