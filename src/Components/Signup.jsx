import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AxiosService from "../General/ApiService"


function Signup() {
    
    let [errorMessage, setErrorMessage] = useState("");
    let [submit,setSubmit] = useState(false);

    const UserSchema = Yup.object().shape({
        name:Yup.string().required('* Required'),
        email:Yup.string().email('* Invalid Email').required('* Required'),
        phonenumber:Yup.string().matches(/^\d{10}$/,'* Invalid Phone Number').required('* Required'),
        password: Yup.string().required('*Required'),
        role:Yup.string()
      })

      let navigate = useNavigate(); 

      const token = sessionStorage.getItem("token")

      const handleAddUser = async(values)=>{  
      
     try {
      setSubmit(true);
       let res = await AxiosService.post("/signup",values)
       console.log(values)
       if(res.status === 201){
        toast.success("Registered Successfully")
        if (values.role === "engineer") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
       }
       
     } catch (error) {
       toast.error(  error.response.data.message )
       
       if (error.response && error.response.data && error.response.data.message) {
         setErrorMessage(error.response.data.message);
       } else {
         setErrorMessage('An error occurred. Please try again.');
         console.log(error)
       }
     }
      finally{
        setSubmit(false);
      }
     }

      return  <> <div className="w-100">
            <h2 className="logo mx-2">DS Services</h2>
            <div className="row justify-content-start m-0">
              <div className="col-lg-4 col-12 col-sm-6 p-0 card login-page">
              <div className="login-form w-75">
                <h3 className="Register-heading">Register!</h3>
    
                <Formik 
                       initialValues={{
                        name:"",
                        email:"",
                        password:'',
                        phonenumber:'',
                        role:"user"
                        
                       }}
                       validationSchema={UserSchema}
                       onSubmit={(values)=>{handleAddUser(values) }}
                       >
               {({ values,errors,touched,handleBlur,handleSubmit,handleChange})=>(
                 <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name:</Form.Label>
                   <Form.Control type="text" name='name' placeholder="Enter Name" onBlur={handleBlur} onChange={handleChange}/>
                 {errors.name && touched.name ? <div style={{color:"red"}}>{errors.name}</div>:null}
              </Form.Group>
    
            
          <Form.Group className="mb-3">  
            <Form.Label>Email:</Form.Label>
               <Form.Control type="email" name='email' placeholder="Enter email"  onBlur={handleBlur} onChange={handleChange}/>   
            {errors.email && touched.email ? <div style={{color:"red"}}>{errors.email}</div>:null}
          </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" name='password' placeholder="Enter password"  onBlur={handleBlur} onChange={handleChange}/>
              {errors.password && touched.password ? <div style={{color:"red"}}>{errors.password}</div>:null}
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control type="text" name='phonenumber' placeholder="Enter Phonenumber" onBlur={handleBlur} onChange={handleChange}/>
              {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
              { errors.phonenumber && touched.phonenumber ? <div style={{color:"red"}}> {errors.phonenumber}</div>:null}
            </Form.Group>
      
            {
              (token !== null) && 
              <>
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
                  </Form.Control>
                  {errors.role && touched.role ? (
                    <div style={{ color: "red" }}>{errors.role}</div>
                  ) : null}
                </Form.Group>
            </>
            
            }
              
              <Button type="submit" disabled={submit}>{submit ? "Submitting" : "Submit"}</Button>
          </Form>
           )}
          </Formik>
    
                </div>
                </div>
    
                <div className="right-side col-lg-8 p-0">
                <img
                  src="/Images/Admin login.jpg"
                  alt=""
                  srcSet=""
                  className="right-image w-100"
                />
    
              </div>
            </div>
          </div>
          
        
        </>
      
}

export default Signup