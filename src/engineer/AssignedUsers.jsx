import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { Table, Button } from "react-bootstrap";
import AxiosService from "../General/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import Engineersidebar from "../data/EngineerSidebar";
import Update from "../Components/Update"
import Service from "../Components/Service"

function AssignedUsers() {
  
  const [data, setData] = useState([]);
  let [service,setService] = useState([]);

  const params = useParams();

  let navigate = useNavigate();

  const [show,setShow] = useState(false);
  const [open,setOpen] = useState(false);

 
  const modalclose = ()=>setOpen(false);
  const modalShow = ()=>{
    setOpen(true);
  }
  
  const handleClose = () => setShow(false);
  const handleShow = (params)  => {
    setShow(true);
    getService(params)
  }
    

  const getData = async () => {
    try {
      let res = await AxiosService.get("/engineer/assignedusers");
      console.log(res.data.AssignedUsers[0])
      if (res.status === 200) {
        setData(res.data.AssignedUsers);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error Occoured!");
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
      <div className="dashboard">
        <div className="left-nav m-0 p-0">
          <Engineersidebar />
        </div>
        <div className="right-content m-0 p-0">
          <div className="row my-5 mx-2">
            <h4>Assigned Users</h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Service ID</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{e._id}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.phonenumber}</td>
                        <td>{e.service[0]._id}</td>
                        <td style={{ color: "#013cc6" }}>
                          {e.status ? "Pending" : "Completed"}
                        </td>

                        <td>
                          <Button
                            variant="primary"
                            onClick={() => {
                              handleShow(e._id);
                             }}
                          >
                            Service
                          </Button>

                        <Service  
                          show={show} 
                          service={service}
                          handleClose={handleClose} />

                          &nbsp; &nbsp;

                          <Button
                            variant="primary"
                            onClick={() => {
                             modalShow();
                            }}
                          >
                            Update
                          </Button>
                          
                          <Update 
                          open={open}
                          modalclose={modalclose}
                          params={e._id} />

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

export default AssignedUsers;
