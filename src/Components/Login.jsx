import { React, useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Formik } from "formik";
import * as Yup from "yup";
import AxiosService from "../General/ApiService";
import { toast } from "react-toastify";

function Login() {

  let [errorMessage, setErrorMessage] = useState("");

  let [submit,setSubmit] = useState(false);

  let [data,setData] = useState({
    email:"",
    role:""
  })

  let navigate = useNavigate();

  let validateLogin = async (values) => {
    
    try {
      setSubmit(true);
      let res = await AxiosService.post("/login", {
        email: values.email,
        password: values.password,
        role: values.role,
      });
  
      if (res.status === 200) {
       
        toast.success("Logged in Successfully");
        sessionStorage.setItem("token", res.data.token);
     
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (res.data.user.role === "engineer") {
          navigate("/engineer/dashboard");
        } else if (res.data.user.role === "user") {
          navigate("/user/dashboard");
        } else {
          navigate("/");
        }
       }
    } catch (error) {
      setErrorMessage(error.response);
      toast.error(
        error.response|| "Error Occoured! Invalid Password"
      );

      console.log(error)
    }
    finally{
      setSubmit(false);
    }
    
  };
  

  const NavigateFP = ()=>{
    navigate("/forgetPassword",{state:{
      email:email,
      role:role
    }})
  }

  
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("*Required"),
    password: Yup.string(),
    role: Yup.string().required("*Required"),
  });



  return (
    <>
      <div className="w-100">
        <h2 className="logo mx-2">DS Services</h2>
        <div className="row justify-content-center m-0">
          <div className="col-lg-4 col-12 col-sm-6 col-md-6 p-0 card login-page">
            <div className="login-form w-75">
              <h3 className="login-heading mb-4">Welcome back!</h3>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  role: "user",
                }}
                validationSchema={LoginSchema}
                onSubmit={ (values) => {
                  validateLogin(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  handleChange,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type = "email"
                        name="email"
                        placeholder="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />

                      {errors.email && touched.email ? (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                      />

                      {errors.password  ? (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-2">
                  <Form.Label>Role:</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.role}
                  >
                    <option value="user">User</option>
                    <option value="engineer">Engineer</option>
                    <option value="admin">Admin</option>
                  </Form.Control>
                  {errorMessage || errors.role && touched.role ? (
                    <div style={{ color: "red" }}>{errors.role}{errorMessage}</div>
                  ) : null}
                </Form.Group>
                    &nbsp;
                    <div className="d-grid">
                      <Button type="submit" disabled={submit}>{submit ? "Submitting" : "Submit"}</Button>
                    </div>
                    <div className="d-flex justify-content-between py-2">
                      <Link to="/forgetPassword" className="login-link">
                        Forget Password
                      </Link>
                      <Link to="/signup" className="login-link mx-3">
                        Register
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className="right-side col-lg-8 col-md-6 p-0">
            <img
              src="/Images/Admin login.jpg"
              alt=""
              className="right-image w-100"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;



