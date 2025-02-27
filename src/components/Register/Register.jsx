import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";

function Register() {
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "Minimum length is 3")
      .max(15, "Maximum length is 15")
      .required("This field is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid password format"),
    confirmedPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("This field is required"),
  });

  async function register(values) {
    try {
      let { data } = await axios.post(`http://localhost:8000/auth/register`, values);
      console.log(data);
      console.log(data.message);
      
      if (data.message === "registered successfully") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      setApiError(error.response?.data?.message || "An error occurred");
    }
  }

  let registerForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="my-5">Register</h1>
          {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}

          <form onSubmit={registerForm.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={registerForm.values.userName}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                placeholder="Username"
              />
              <label htmlFor="userName">Username</label>
              {registerForm.errors.userName && registerForm.touched.userName ? (
                <div className="text-danger">{registerForm.errors.userName}</div>
              ) : (
                ""
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={registerForm.values.email}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                name="email"
              />
              <label htmlFor="email">Email</label>
              {registerForm.errors.email && registerForm.touched.email ? (
                <div className="text-danger">{registerForm.errors.email}</div>
              ) : (
                ""
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={registerForm.values.password}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                name="password"
              />
              <label htmlFor="password">Password</label>
              {registerForm.errors.password && registerForm.touched.password ? (
                <div className="text-danger">{registerForm.errors.password}</div>
              ) : (
                ""
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="confirmedPassword"
                placeholder="Confirm Password"
                value={registerForm.values.confirmedPassword}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                name="confirmedPassword"
              />
              <label htmlFor="confirmedPassword">Confirm Password</label>
              {registerForm.errors.confirmedPassword &&
              registerForm.touched.confirmedPassword ? (
                <div className="text-danger">
                  {registerForm.errors.confirmedPassword}
                </div>
              ) : (
                ""
              )}
            </div>

            <button className="btn btn-success" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
