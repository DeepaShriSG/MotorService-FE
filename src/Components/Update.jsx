import React, { useState, useEffect, useContext} from "react";
import { toast } from "react-toastify";
import { useNavigate,useParams } from "react-router-dom";
import { Button,Form } from "react-bootstrap"; 
import Modal from "react-bootstrap/Modal";

import AxiosService from "../General/ApiService";
import Updatedata from "../context/UpdateProvider"

function Update({ show, onSubmit, handleClose ,params, open,modalclose}) {

    let [errorMessage, setErrorMessage] = useState("");
 
    let [submit,setSubmit] = useState(false)
    
    const [data, setdata] = useState([]);
  
    const navigate = useNavigate();
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setdata({
        ...data,
        [name]: value,
      });
    };

  
    const getData = async () => {
      try {
        let res = await AxiosService.get(`/getuser/${params}`);
        if (res.status === 200) {  
          setdata({
            userId:  res.data.user._id,
          });
        } else {
          console.error("Unexpected response status:", res.status);
        }
      } catch (error) {
        toast.error(
          error.response.data.message ||
            "Error Occoured!"
        );
        console.error("Error fetching data:", error);
      }
    };
  
    const user = sessionStorage.getItem("user");
    const userObj = JSON.parse(user);
  
    const userAction = async (e) => {
      e.preventDefault();
      try {
        setSubmit(true);
        const UpdateValue = data.update === "true" ? true : false;
  
        const res = await AxiosService.post(`/update/${params}`, {
          update: UpdateValue,
        });
        
  
        if (res.status === 200) {
          
          data.update = UpdateValue,
          
          toast.success("User action updated")
          
          if(userObj.role === "admin"){

            navigate("/admin/allusers");
            handleClose() || modalclose();

          }else if(userObj.role === "engineer"){

            navigate("/engineer/assignedusers");
            handleClose() || modalclose();
            
          }else{
            navigate("/")
          }
        
          
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      }finally{
        setSubmit(false);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);
  

  return <>
    <Modal
      show={open || show}
      onHide={handleClose || modalclose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
              <h3 className="assign-heading text-center mb-4">
                Update User Action
              </h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
        <Form onSubmit={userAction}>
                  <Form.Group className="mb-3">
                    <Form.Label>User Id:</Form.Label>
                    <Form.Control
                      type="text"
                      name="userId"
                      placeholder="Enter UserId"
                      value={data.userId}
                      onChange={handleInputChange}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Action:</Form.Label>
                    <Form.Control
                      as="select"
                      name="update"
                      value={data.update}
                      onChange={handleInputChange}
                    > 
                      <option value="" disabled>
                        Action
                      </option>
                      <option value="false">Completed</option>
                      <option value="true">Pending</option>
                    </Form.Control>
                  </Form.Group>

                  {errorMessage ? (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  ) : null}

                  <Button type="submit" disabled={submit}>{submit ? "Submitting" : "Submit"}</Button>
                </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={ handleClose || modalclose }>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export default Update;
