import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppState } from "../../context/appContext";
import FormContainer, {
  MyTextArea,
} from "../../components/formContainer/formContainer";
import LoadingCard from "../../components/cards/loadingCard/loadingCard";

const CreatePostPage = () => {
  const { createPost } = useAppState();
  const [message, setMessage] = useState({ succeed: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const submitCreatePost = async (values, { setSubmitting, setValues }) => {
    try {
      setIsLoading(true);
      const created = await createPost({
        title: values.title,
        body: values.body,
      });
      if (created) {
        setMessage({ succeed: true, message: "Post successfully created" });
        setValues({ title: "", body: "" });
      } else {
        // server error
        setMessage({ succeed: false, message: "Failed, please try again" });
      }
      setIsLoading(false);
    } catch (error) {
      // network error
      setMessage({ succeed: false, message: "Failed, please try again" });
      setIsLoading(false);
    }
  };

  return (
    <div className={`d-flex flex-column align-items-center`}>
      <h3 className="mt-4">Create Post</h3>
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
        {isLoading && (
          <div className="bg-white bg-opacity-75 position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <LoadingCard />
          </div>
        )}
      </FormContainer>
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

export default CreatePostPage;
