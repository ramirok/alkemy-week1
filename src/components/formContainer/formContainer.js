import { Formik } from "formik";
import { useState } from "react";
import classes from "./formContainer.module.css";

const FormContainer = (props) => {
  const { submitForm, initialValues } = props;
  const [message, setMessage] = useState("");
  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Password is required";
        }
        return errors;
      }}
      onSubmit={submitForm}
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
              <h2 className="h3 fw-normal text-center">Please sign in</h2>
              <div className="form-floating w-100 mt-4">
                <input
                  type="text"
                  name="email"
                  className="form-control bg-white rounded-0"
                  id="floatingInput"
                  placeholder="challenge@alkemy.org"
                  onChange={handleChange}
                  value={values.email}
                />
                <label htmlFor="floatingInput">Email address</label>
                <span className={classes.error}>
                  {errors.email && touched.email && errors.email}
                </span>
              </div>
              <div className="form-floating w-100 mt-4">
                <input
                  type="password"
                  name="password"
                  className="form-control bg-white rounded-0"
                  id="floatingPassword"
                  placeholder="react"
                  onChange={handleChange}
                  value={values.password}
                />
                <label htmlFor="floatingPassword">Password</label>
                <span className={classes.error}>
                  {errors.password && touched.password && errors.password}
                </span>
              </div>

              <button
                className="w-100 btn btn-lg btn-dark rounded-0 border-0 mt-4"
                type="submit"
                disabled={isSubmitting}
              >
                Sign in
              </button>
              <span className={classes.error}>{message}</span>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
