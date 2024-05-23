import React, { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { Table, Button, Modal } from "react-bootstrap";
import Service from "../Components/Service"
import AxiosService from "../General/ApiService";
import AdminSidebar from "../data/AdminSidebar";
import { useNavigate,useParams } from "react-router-dom";


function ServiceRequests() {

  let [data, setData] = useState([]);
  let [service,setService] = useState([]);
  
  let navigate = useNavigate();

  const [show, setShow] = useState(false);

 

  const handleClose = () => setShow(false);
  const handleShow = (params)  => {
    setShow(true);
    getService(params)
  }
    
   
  const params = useParams();
  
  const getData = async () => {
    try {
      let res = await AxiosService.get("/user/activeusers");

      if (res.status === 200) {
        setData(res.data.activeuser);
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occured"
      );
      console.error("Error fetching data:", error);
      console.log("Invalid request");
    }
  };

  const getService = async (params) => {
    
    try {
      
      let res = await AxiosService.get(`/getService/${params}`);
      
      
    
      if (res.status === 200) {
        const serviceData = res.data.user[0].service[0];
       
        setService({
          id: serviceData._id,
          brand: serviceData.brand,
          model: serviceData.model,
          manufactureyear: serviceData.manufactureyear,
          servicetype: serviceData.servicetype,
        });
      } else {
        console.error("Unexpected response status:", error);
      }
    } catch (error) {
      toast.error(error.response || "Error Occoured!");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();

  }, []);

  return (
    <div className="w-100">
      <AdminSidebar />

      <div className="right-content px-3">
        <div className="d-block d-sm-none m-2">
          <span className="row justify-content-between align-items-center">
            <a className="sidebarlogo navbar-brand col-6 m-0" href="#">
              DS Services
            </a>
            <div className="col-6 text-end px-4">
              <i
                className="menuicon fa-solid fa-bars fa-xl"
                data-bs-toggle="offcanvas"
                data-bs-target="#staticBackdrop"
                aria-controls="staticBackdrop"
              ></i>
            </div>
          </span>
        </div>
        <div className=" m-0 p-0">
          <div className="row my-5 mx-2">
            <h4>Service Requests</h4>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { data && data.map((e, i) => {
                    return (
                      <tr key={e._id}>
                        <td>{i + 1}</td>
                        <td>{e._id}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.phonenumber}</td>
                        <td>{e.serviceEngineer ? "Assigned" : "Unassigned"}</td>

                        <td>
                        <Button
                            variant="primary"
                            onClick={() => {
                              navigate(`/admin/assignuser/${e._id}`);
                            }}
                            style={{ backgroundColor: "#013cc6" }}
                          >
                            Assign
                          </Button>
                          &nbsp; &nbsp;
                          <Button
                            variant="primary"
                          
                            onClick={() => {
                              handleShow(e._id);
                              
                            }}
                            
                            style={{ backgroundColor: "#013cc6" }}
                          >
                            Service
                          </Button>

                          <Service  
                          show={show} 
                          service={service}
                          handleClose={handleClose} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceRequests;
