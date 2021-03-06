import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { saveToken } from "../../libs/localStorage";
import FormContainer, {
  MyTextInput,
} from "../../components/formContainer/formContainer";
import classes from "./loginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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
      } else {
        // bad credentials error
        setErrorMessage("Failed, please try again");
      }
    } catch (error) {
      // network error
      setErrorMessage("Failed, please try again");
    }
  };

  return (
    <div className="p-3 d-flex flex-column justify-content-around align-items-center min-vh-100 ">
      <div className={classes.logoContainer}>
        <Logo className={classes.logo} />
      </div>
      <div className="w-100 d-flex flex-column align-items-center justify-content-center">
        <FormContainer
          submitForm={submitLoginForm}
          values={{ email: "", password: "" }}
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
        >
          <h2 className="h3 fw-normal text-center">Please sign in</h2>

          <MyTextInput
            label="Email"
            name="email"
            type="text"
            placeholder="challenge@alkemy.org"
          />
          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder="react"
          />
        </FormContainer>
      </div>
      <div className="text-danger">{errorMessage}&nbsp;</div>
    </div>
  );
};

export default LoginPage;
