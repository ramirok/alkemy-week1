import { Formik, Form, useField } from "formik";

import classes from "./formContainer.module.css";

export const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} className="w-100">
        {label}
      </label>
      <input
        className="form-control bg-white rounded-0"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : (
        <div>&nbsp;</div>
      )}
    </>
  );
};

export const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name} className="w-100">
        {label}
      </label>
      <textarea
        className="form-control bg-white rounded-0"
        {...field}
        {...props}
        style={{ height: "100px" }}
      />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : (
        <div>&nbsp;</div>
      )}
    </>
  );
};

const FormContainer = (props) => {
  const { submitForm, validate, values } = props;
  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={values}
      validate={validate}
      onSubmit={submitForm}
    >
      {({ isSubmitting }) => {
        return (
          <div className={`${classes.formContainer}`}>
            <Form className="d-flex flex-column align-items-center justify-content-center">
              {props.children}
              <button
                className="w-100 btn btn-lg btn-dark rounded-0 border-0 mt-4"
                type="submit"
                disabled={isSubmitting}
              >
                Send
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default FormContainer;
