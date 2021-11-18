import { useState } from "react";
import { Formik } from "formik";
import classes from "./createPostPage.module.css";
import { useAppState } from "../../context/appContext";

const CreatePostPage = () => {
  const [message, setMessage] = useState({ succeed: false, message: "" });
  const { createPost } = useAppState();

  const submitCreatePost = async (values, { setSubmitting }) => {
    try {
      const created = await createPost({
        title: values.title,
        body: values.body,
      });
      if (created) {
        setSubmitting(false);
        setMessage({ succeed: true, message: "Post successfully created" });
      }
    } catch (error) {
      setMessage({ succeed: false, message: "Failed, please try again" });
    }
  };

  return (
    <div className={`d-flex flex-column align-items-center`}>
      <h3 className="mt-4">Create Post</h3>
      {
        <div className={`${classes.formContainer} mt-4`}>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{ title: "", body: "" }}
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
            onSubmit={submitCreatePost}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => {
              return (
                <form
                  className="d-flex flex-column align-items-center justify-content-center"
                  onSubmit={handleSubmit}
                >
                  <div className="w-100">
                    <div className="w-100">
                      <label htmlFor="title">Post Title</label>
                      <textarea
                        type="text"
                        name="title"
                        className="form-control bg-white rounded-0"
                        id="title"
                        onChange={handleChange}
                        value={values.title}
                        style={{ height: "100px" }}
                      />
                      <span className={classes.error}>
                        {errors.title && touched.title && errors.title}
                      </span>
                    </div>
                    <div className="w-100 mt-4 position-relative">
                      <label htmlFor="body">Post Body</label>
                      <textarea
                        type="text"
                        name="body"
                        className="form-control bg-white rounded-0"
                        id="body"
                        onChange={handleChange}
                        value={values.body}
                        style={{ height: "150px" }}
                      />
                      <span className={classes.error}>
                        {errors.body && touched.body && errors.body}
                      </span>
                    </div>

                    <button
                      className="w-100 btn btn-lg btn-dark rounded-0 border-0 mt-4"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Create
                    </button>
                    <div
                      className={`text-center ${
                        message.succeed ? classes.succeed : classes.error
                      }`}
                    >
                      {message.message}
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      }
    </div>
  );
};

export default CreatePostPage;
