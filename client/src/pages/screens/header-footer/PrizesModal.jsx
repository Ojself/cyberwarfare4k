import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const PrizesModal = ({ prizeModalOpen, togglePrizeModal }) => {
  return (
    <Modal isOpen={prizeModalOpen} toggle={togglePrizeModal}>
      <ModalHeader toggle={togglePrizeModal}>
        <p className="text-warning font-weight-bold">PRIZES</p>
      </ModalHeader>
      <ModalBody>
        <strong>WEALTHIEST HACKERS </strong>

        <span role="img" aria-label="Gold medal">
          🏅
        </span>

        <p>
          The top 3 hackers will be awarded with profile decoration and{" "}
          <Link className="text-light font-weight-bold" to="/tokens">
            tokens
          </Link>{" "}
          for him or her to use in the next round!
        </p>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <span role="img" aria-label="1st medal">
              🥇
            </span>
            2000 tokens
          </li>
          <li>
            <span role="img" aria-label="2nd medal">
              🥈
            </span>
            750 tokens
          </li>
          <li>
            <span role="img" aria-label="3rd medal">
              🥉
            </span>
            250 tokens
          </li>
        </ul>
        <strong>WEALTHIEST ALLIANCE </strong>
        <span role="img" aria-label="Hat emoji">
          🎩
        </span>
        <p>
          The wealthiest alliance by the end of the round will be awarded with{" "}
          <Link className="text-light font-weight-bold" to="/tokens">
            tokens
          </Link>
          .
        </p>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <span role="img" aria-label="Computer Laptop">
              💻 300 tokens for each member
            </span>
          </li>
        </ul>
      </ModalBody>
      <ModalFooter>
        <div>
          <p className="my-0">The round will end 11th of April</p>
          {/* <p style={{ fontSize: "0.75rem" }}>Terms and conditions tba</p> */}
        </div>
      </ModalFooter>
      <ModalFooter>
        <Button color="primary" onClick={togglePrizeModal}>
          Take me back!
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PrizesModal;
