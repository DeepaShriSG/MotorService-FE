import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import AxiosService from "../General/ApiService"

function ForgetPassword() {
 
  let [email,setEmail] = useState("")
  let [role, setRole] = useState("");

  let [submit,setSubmit] = useState(false);
  
  let [text,setText] = useState("Please enter your registered email")

  let navigate = useNavigate();


  let ForgetFunction = async()=>{
    try {
        let res = await AxiosService.post("/forget-password",{
          email,
          role
        })
        
    } catch (error) {
      toast.error(error.response || "Error Occoured! Try Again");
      console.log(error)
    }
  }

  let ForgetPass = ()=>{
    ForgetFunction();
    setText("Please check your Registered Email for Reset Link. You can close this tab for now.");
  }


  return (
    <>
      <div className="w-100">
        <h2 className="logo mx-2">DS Services</h2>
        <div className="row justify-content-center m-0">
          <div className="col-lg-4 col-12 col-sm-6 p-0 card login-page">
            <div className="login-form w-75">
              <h3 className="login-heading mb-4">Forget Password</h3>
              <p>
                <b>{text}</b>
              </p>

              <form>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">
                    Enter your Email address
                  </label>
                </div>

                <select className="form-select" aria-label="Default select example"
                 onChange={(e)=>{setRole(e.target.value)}}>
                  <option defaultValue>Role:</option>
                  <option value="user">User</option>
                  <option value="engineer">Engineer</option>
                  <option value="admin">Admin</option>
                </select>
                 &nbsp;

                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                    onClick={()=>ForgetPass()}
                    disabled={submit}>{submit ? "Submitting" : "Submit"}
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
          <div className="right-side col-lg-8 p-0">
            <img
              src="/Images/forgot-password.jpg"
              alt=""
              srcSet=""
              className="right-image w-100"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
