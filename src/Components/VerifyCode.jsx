import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AxiosService from "../General/ApiService";

function VerifyCode({ show, onSubmit, data, handleClose }) {
  let [code, setcode] = useState({
    code: " ",
  });

  let [submit,setSubmit] = useState(false);

  let navigate = useNavigate();

  let validate = async (e) => {
    e.preventDefault();

    try {
      setSubmit(true);
      let res = await AxiosService.post("/verifyCode", {
        code,
      });
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.data.user.role === "engineer") {
        navigate("/engineer/dashboard");
      } else if (res.data.user.role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Error Occoured! Invalid Password"
      );

      console.log(error);
      console.log("Error Occoured! Invalid data");
    }finally{
      setSubmit(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3 className="Verify-heading mb-4">Verification</h3>
          <p>
            {" "}
            <b>Please check your registered email for Verification Code</b>
          </p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <form>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setcode(e.target.value)}
              />
              <label htmlFor="floatingPassword">Verification Code</label>
            </div>

            <div className="d-grid">
              <button
                className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                onClick={validate}
                disabled={submit}>
                  {submit ? "Submitting" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VerifyCode;
