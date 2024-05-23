import React, { useState, useEffect } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../General/ApiService";

function PasswordReset() {

  const [errorMessage, setErrorMessage] = useState("");

  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  let [submit,setSubmit] = useState(false);
  
  const navigate = useNavigate();

  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");
  
     
    useEffect(() => {
        
        if (token) {
            sessionStorage.setItem("token", token);
          }      
    }, [token])
    

  const savePassword = async (e) => {
    e.preventDefault();
    if (newpassword !== confirmpassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setSubmit(true);
      const res = await AxiosService.post("/reset-password", {
        newpassword,
        confirmpassword,
      });
      

      if (res.status === 200) {
        toast.success("Password changed successfully");
        if (res.data.role === "admin") {
            navigate("/admin/dashboard");
          } else if (res.data.role === "engineer") {
            navigate("/engineer/dashboard");
          } else if (res.data.role === "user") {
            navigate("/user/dashboard");
          } else {
            navigate("/");
          }
      }
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred!";
      toast.error(message);
      setErrorMessage(message);
      console.error("Error:", error);
    }
    finally{
      setSubmit(false);
    }
  };

  return (
    <div className="w-100">
      <h2 className="logo mx-2">DS Services</h2>
      <div className="row justify-content-center m-0">
        <div className="col-lg-4 col-12 col-sm-6 p-0 card login-page">
          <div className="login-form w-75">
            <h3 className="login-heading mb-4">Reset Password</h3>
            <form onSubmit={savePassword}>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword1"
                  placeholder="Password"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword1">New password</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword2"
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword2">Confirm password</label>
              </div>

              {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                  disabled={submit}>
                    {submit ? "Submitting" : "Submit"}
                </button>
                
              </div>
            </form>
          </div>
        </div>
        <div className="right-side col-lg-8 p-0">
          <img
            src="/Images/forgot-password.jpg"
            alt="Forgot Password"
            className="right-image w-100"
          />
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
