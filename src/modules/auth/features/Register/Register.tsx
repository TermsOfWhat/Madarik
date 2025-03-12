import Button from "@src/modules/shared/components/Button/Button";
import { useAppDispatch } from "@src/modules/shared/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../data/authThunk";
import { getChangedValues } from "@src/modules/shared/utils/getChangedValuesFormik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../routes/paths";
import AntInput from "@src/modules/shared/components/AntInput/AntInput";

const initialValues = {
  username: "",
  email: "",
  password: "",
  verify_password: "",
  phone: null,
  age: null,
  birthDate: null,
};

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^([a-zA-Z0-9._%+-]+)@((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/,
          "Invalid email address"
        )
        .test(
          "no-special-chars",
          "Email contains disallowed characters",
          (value: string | undefined) =>
            !value || /^[^<>()\\/[\]{}\s]+@[^\s]+$/.test(value)
        )
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short!"),
      verify_password: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: (values) => {
      setSubmitting(true);
      const changedValues = getChangedValues(values, initialValues);
      dispatch(register(changedValues))
        .unwrap()
        .then(() => {
          navigate(PATH.LOGIN);
        })
        .catch((err) => {
          alert(err?.message || "something-went-wrong");
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="register-module">
      <form className="register-card-container" onSubmit={formik.handleSubmit}>
        <h1 className="title">Register</h1>

        <AntInput
          name="username"
          formik={formik}
          placeholder="Enter your username"
          label="Username"
          required={true}
        />

        <AntInput
          name="email"
          formik={formik}
          placeholder="Enter your email"
          label="Email"
          type="email"
          required={true}
        />

        <AntInput
          name="password"
          formik={formik}
          placeholder="Enter your password"
          label="Password"
          type="password"
          required={true}
        />

        <AntInput
          name="verify_password"
          formik={formik}
          placeholder="Enter your confirm password"
          label="Confirm Password"
          type="password"
          required={true}
        />

        <Button label={"Register"} type={"submit"} loading={submitting} />

        <Link to={PATH.LOGIN} className="link">
          Already a member?
        </Link>
      </form>
    </div>
  );
};

export default Register;
