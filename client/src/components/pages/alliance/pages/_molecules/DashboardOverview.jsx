import React, { useState } from "react";
import MiniDataCenterOverview from "../../../myProfile/molecules/MiniDataCenterOverview"

import {
  Button,
  
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
const DashboardOverview = ({dataCenters, cities,leaveAlliance,allianceId}) => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    return (
      <div className="my-5">
        <MiniDataCenterOverview owner={allianceId} />
        <Button className="mt-5" onClick={toggleModal} color="danger">
          Leave alliance
        </Button>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Leave Alliance</ModalHeader>
          <ModalBody>
            You are about to leave your alliance, you can not get back unless
            you are invited. Are you sure?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={leaveAlliance}>
              Leave Alliance
            </Button>{" "}
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}

export default DashboardOverview


