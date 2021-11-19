import { useState } from "react";
import { useAppState } from "../../context/appContext";
import FormContainer, {
  MyTextArea,
} from "../../components/formContainer/formContainer";
import { Link } from "react-router-dom";
import LoadingCard from "../../components/cards/loadingCard/loadingCard";

const CreatePostPage = () => {
  const [message, setMessage] = useState({ succeed: false, message: "" });
  const { createPost } = useAppState();
  const [isLoading, setIsLoading] = useState(false);

  const submitCreatePost = async (values, { setSubmitting }) => {
    setIsLoading(true);
    const created = await createPost({
      title: values.title,
      body: values.body,
    });
    if (created) {
      setSubmitting(false);
      setMessage({ succeed: true, message: "Post successfully created" });
    } else {
      setMessage({ succeed: false, message: "Failed, please try again" });
    }
    setIsLoading(false);
  };

  return (
    <div className={`d-flex flex-column align-items-center`}>
      <h3 className="mt-4">Create Post</h3>

      {isLoading ? (
        <LoadingCard />
      ) : message.message ? (
        <div className="mt-5">
          <div className={message.succeed ? "text-success" : "text-danger"}>
            {message.message}
          </div>
          {isLoading ? (
            <LoadingCard />
          ) : (
            message.succeed && (
              <Link
                to="/"
                className="w-100 btn btn-lg btn-dark rounded-0 border-0 mt-4"
              >
                Back To Home
              </Link>
            )
          )}
        </div>
      ) : (
        <FormContainer
          submitForm={submitCreatePost}
          values={{ title: "", body: "" }}
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
        </FormContainer>
      )}
    </div>
  );
};

export default CreatePostPage;
