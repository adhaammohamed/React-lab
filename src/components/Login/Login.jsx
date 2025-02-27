import React , { useState,useContext }  from 'react'
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { TokenContext } from '../../Context/TokenContext';
function Login() {

     const [apiError, setApiError] = useState(null);
      let navigate = useNavigate();

      let {setToken} = useContext(TokenContext);
      const initialValues = {
        email: "",
        password: "",
      };



       const validationSchema = Yup.object().shape({
          
          email: Yup.string()
            .email("Invalid email format")
            .required("This field is required"),
          password: Yup.string()
            .required("This field is required")
            .matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid password format"),
          
        });



        async function login(values) {
          try {
            let { data } = await axios.post(`http://localhost:8000/auth/login`, values);
            console.log(data);
            console.log(data.message);
            
            if (data.message === "login successfully") {
              localStorage.setItem("token", data.token);
              setToken(data.token);
              navigate("/home");
            }
          } catch (error) {
            console.log(error.response?.data?.message || error.message);
            setApiError(error.response?.data?.message || "An error occurred");
          }
        }

      let loginForm = useFormik({
          initialValues,
          validationSchema,
          onSubmit: login,
        });
      

  return (
    <>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1 className="my-5">Login :</h1>
        {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}

        <form onSubmit={loginForm.handleSubmit}>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              name="email"
            />
            <label htmlFor="email">Email</label>
            {loginForm.errors.email && loginForm.touched.email ? (
              <div className="text-danger">{loginForm.errors.email}</div>
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
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              name="password"
            />
            <label htmlFor="password">Password</label>
            {loginForm.errors.password && loginForm.touched.password ? (
              <div className="text-danger">{loginForm.errors.password}</div>
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
  )
}   

export default Login