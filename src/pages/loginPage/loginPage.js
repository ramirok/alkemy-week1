import { useState } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Formik } from "formik";
import classes from "./loginPage.module.css";
import { saveToken } from "../../libs/localStorage";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitLoginForm = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://challenge-react.alkemy.org", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.statusText === "OK") {
        setSubmitting(false);
        const parsedResponse = await response.json();
        saveToken({ token: parsedResponse.token });
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Failed, please try again");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-around align-items-center min-vh-100 ">
      <div className={classes.logoContainer}>
        <Logo className={classes.logo} />
      </div>
      <div className={`${classes.formContainer}`}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ email: "", password: "" }}
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
          onSubmit={submitLoginForm}
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
                  <span className={classes.error}>{errorMessage}</span>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
