import Button from "@src/modules/shared/components/Button/Button";
import { useAppDispatch } from "@src/modules/shared/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../data/authThunk";
import Input from "@src/modules/shared/components/Input/Input";
import { getChangedValues } from "@src/modules/shared/utils/getChangedValuesFormik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PATH } from "../../routes/paths";
import bg from "../../assets/images/bg.svg";
import AntInput from "@src/modules/shared/components/AntInput/AntInput";

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();

  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short!"),
    }),
    onSubmit: (values) => {
      setSubmitting(true);
      const changedValues = getChangedValues(values, initialValues);
      dispatch(login(changedValues))
        .unwrap()
        .then(() => {})
        .catch((err) => {
          alert(err?.message || "something-went-wrong");
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="login-module">
      <div className="container-image">
        <img src={bg} alt="img" />
      </div>
      <form className="login-card-container" onSubmit={formik.handleSubmit}>
        <h1 className="title">Sign in</h1>

        <AntInput
          name="username"
          formik={formik}
          placeholder="Enter your username"
          label="Username"
          required={true}
        />

        <Input
          name="password"
          formik={formik}
          variant="secondary"
          label="Password"
          type="password"
          required={true}
        />

        <Button
          className="btn btn-login"
          label={"Login"}
          type={"submit"}
          loading={submitting}
        />

        <Link to={PATH.REGISTER} className="link">
          Create Account?
        </Link>
      </form>
    </div>
  );
};

export default Login;
