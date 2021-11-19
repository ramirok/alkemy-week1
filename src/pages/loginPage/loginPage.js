import { useState } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import classes from "./loginPage.module.css";
import { saveToken } from "../../libs/localStorage";
import { useNavigate } from "react-router-dom";
import FormContainer, {
  MyTextInput,
} from "../../components/formContainer/formContainer";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitLoginForm = async (values, { setSubmitting }) => {
    console.log("sending");
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
