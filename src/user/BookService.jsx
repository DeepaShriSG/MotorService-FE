import React, { useEffect,useState } from "react";
import { toast } from 'react-toastify'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import AxiosService from "../General/ApiService";


function BookService() {

  const [errorMessage, setErrorMessage] = useState("") 

  let navigate = useNavigate();

  const handleService = async (values) => {
    
    try {
      let res =  await AxiosService.post("/user/bookservice", values);
 
      if(res.status === 201){
        toast.success("Service Booked Successfully")
        navigate("/user/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error("error.response")       
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
        console.error('Error:', error);
      }
      
    }
  };

  const UserSchema = Yup.object().shape({
    brand: Yup.string().required("* Required"),
    model: Yup.string().required("* Required"),
    manufactureyear: Yup.string().required("*Required"),
    servicetype: Yup.string(),
    comments: Yup.string(),
  });

  return <>
   
    <div className="container"> 
    <div className="row justify-content-center mt-3">
      <div className="col-9 col-sm-6 col-lg-5 card py-3 px-4 my-3 me-2">
      <h3 className="Register-heading mb-2">Book Service!</h3>

        <div className="row">
         
        <Formik
            initialValues={{
              brand: "",
              model: "",
              manufactureyear: "",
              servicetype: "Oil Change",
              comments: "",
            }}
            validationSchema={UserSchema}
            onSubmit={(values) => {
              handleService(values);
            }}
          >
            {({ values,errors, touched, handleBlur, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-2">
                  <Form.Label>Brand:</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    placeholder="Enter Brand"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.brand && touched.brand ? (
                    <div style={{ color: "red" }}>{errors.brand}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Model:</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    placeholder="Enter model"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.model && touched.model ? (
                    <div style={{ color: "red" }}>{errors.model}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Year of Manufacture:</Form.Label>
                  <Form.Control
                    type="number"
                    name="manufactureyear"
                    placeholder="Enter manufactureyear"
                    min="1900"
                    max="2023"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.manufactureyear && touched.manufactureyear ? (
                    <div style={{ color: "red" }}>{errors.manufactureyear}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Service Type:</Form.Label>
                  <Form.Control
                    as="select"
                    name="servicetype"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.servicetype}
                  >
                    <option value="Oil Change">Oil Change</option>
                    <option value="Tire Exchange">Tire Exchange</option>
                    <option value="Brake Service">Brake Service</option>
                    <option value="Water wash">Water wash</option>
                    <option value="General service">General service</option>
                  </Form.Control>
                  {errors.servicetype && touched.servicetype ? (
                    <div style={{ color: "red" }}>{errors.servicetype}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Comments:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="comment"
                    placeholder="Enter comment"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                   {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                  {errors.comments && touched.comments ? (
                    <div style={{ color: "red" }}>{errors.comments}</div>
                  ) : null}
                </Form.Group>

                <Button
                  type="submit"
                >
                  Submit
                </Button>
                
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    </div>


   
  
  </>
}

export default BookService;
