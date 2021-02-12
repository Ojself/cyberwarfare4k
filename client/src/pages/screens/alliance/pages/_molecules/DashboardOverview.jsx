import React, { useState } from "react";
import MiniDataCenterOverview from "../../../myProfile/molecules/MiniDataCenterOverview";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const DashboardOverview = ({ leaveAlliance, alliance, homeCity }) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const toggleModalAndLeaveAlliance = () => {
    toggleModal();
    leaveAlliance();
  };
  return (
    <div className="my-5">
      <div className="mb-5">
        <h6>
          <strong>{alliance.name}</strong> alliance
        </h6>
        <h6>
          Home city: <strong>{homeCity.name}</strong>
        </h6>
      </div>

      <MiniDataCenterOverview owner={alliance._id} />
      <Button className="mt-5" onClick={toggleModal} color="danger">
        Leave alliance
      </Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Leave Alliance</ModalHeader>
        <ModalBody>
          You are about to leave your alliance, you can not get back unless you
          are invited. Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModalAndLeaveAlliance}>
            Leave Alliance
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DashboardOverview;
