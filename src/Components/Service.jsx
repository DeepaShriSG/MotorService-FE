import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AxiosService from "../General/ApiService"

function Service({ show, handleClose, params,service }) {

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
          <h3 className="service-heading text-center mb-2">Service details</h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              value={service.id}
              name="id"
              placeholder="Enter Id"
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={service.brand}
              name="brand"
              placeholder="Enter brand"
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              value={service.model}
              name="model"
              placeholder="Enter model"
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Manufactureyear:</Form.Label>
            <Form.Control
              type="text"
              value={service.manufactureyear}
              name="manufactureyear"
              placeholder="Enter manufactureyear"
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Servicetype:</Form.Label>
            <Form.Control
              type="text"
              value={service.servicetype}
              name="servicetype"
              placeholder="Enter servicetype"
              readOnly
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Service;
