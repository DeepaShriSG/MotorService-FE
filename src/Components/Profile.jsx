import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VerifyCode from "./VerifyCode";
import AxiosService from "../General/ApiService";
import Menu from "../user/Menu";
import EngineerSidebar from "../data/EngineerSidebar"
import AdminSidebar from "../data/AdminSidebar"

function Profile() {

  const [show,setShow] = useState(false);

  let [submit,setSubmit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    role:""
  });

  let navigate = useNavigate();

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("* Required"),
    email: Yup.string().email("* Invalid Email").required("* Required"),
    phonenumber: Yup.string()
      .matches(/^\d{10}$/, "* Invalid Mobile Number")
      .required("* Required"),
  });

  const getData = async (values) => {
    try {
      let res = await AxiosService.get("/getProfile", values);
    
      if (res.status === 200) {
        setData({
          name: res.data.data.name,
          email: res.data.data.email,
          phonenumber: res.data.data.phonenumber,
          role:res.data.data.role
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = async (values) => {
    try {
      setSubmit(true);
      let res = await AxiosService.put("/user/edituser", values);

      if (res.status === 200) {
        toast.success("User Details Edited successfully");
        navigate("/user/profile");
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Error Occoured! Invalid Password"
      );
      console.log(error);
    }
    finally{
      setSubmit(false);
    }
  };

  const sendCode = async()=>{
    try {
        let res = await AxiosService.get("/sendCode");
        toast.success("Check your registered email for code");
    } catch (error) {
      toast.error(
        error.response.data.message || "Error Occoured! Invalid Password"
      );
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {
      data.role === "user" ? (<Menu/> ) 
      : data.role === "engineer" ? ( <EngineerSidebar/> ) 
      : data.role === "admin" ? ( <AdminSidebar/>)
      : null
      }
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div className="col-9 col-sm-6 col-lg-5 card py-3 px-4 my-3 me-2">
            <h3 className="Profile-heading mb-2">Profile</h3>

            <div className="row">
              <Formik
                initialValues={data}
                validationSchema={ProfileSchema}
                enableReinitialize={true}
                onSubmit={(values) => {
                  handleEditUser(values)
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
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.name}
                        name="name"
                        placeholder="Enter Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.name && touched.name ? (
                        <div style={{ color: "red" }}>{errors.name}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={values.email}
                        name="email"
                        placeholder="Enter email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.email && touched.email ? (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number:</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.phonenumber}
                        name="phonenumber"
                        placeholder="Enter phonenumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.phonenumber && touched.phonenumber ? (
                        <div style={{ color: "red" }}>{errors.phonenumber}</div>
                      ) : null}
                    </Form.Group>

                    <Button
                      variant="primary"
                      onClick={()=>{
                        handleShow();
                        sendCode();
                      }}
                      disabled={submit}>{submit ? "Submitting" : "Submit"}
                    </Button>
                    <VerifyCode
                      show={show}
                      handleClose={handleClose}
                     
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
