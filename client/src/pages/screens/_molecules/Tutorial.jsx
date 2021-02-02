import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import infoJson from "../information/infoCollection";

const Tutorial = ({ section, size, topPadding }) => {
  const [modal, setModal] = useState(false);
  const [checkBoxSelected, setcheckBoxSelected] = useState(true);

  const onCheckboxBtnClick = () => {
    setcheckBoxSelected(!checkBoxSelected);
  };
  const toggle = () => setModal(!modal);

  const handleButton = () => {
    if (checkBoxSelected) {
      let existingStorage = localStorage.getItem("tutorial");
      existingStorage = existingStorage ? existingStorage.split(",") : [];
      existingStorage.push(section);
      localStorage.setItem("tutorial", existingStorage);
    }
    toggle();
  };

  let existingStorage = localStorage.getItem("tutorial");
  existingStorage = existingStorage ? existingStorage.split(",") : [];

  const userHasDeactivated = existingStorage.includes(section);

  const defaultSize = size ? size : "md";

  const sizes = {
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
  };
  const defaultPadding = topPadding || topPadding === 0 ? topPadding : 3;
  const iconStyle = { cursor: "pointer", fontSize: sizes[defaultSize] };

  return (
    !userHasDeactivated && (
      <>
        <i
          style={iconStyle}
          onClick={toggle}
          className={`far fa-question-circle text-info pt-${defaultPadding}`}
        ></i>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>{infoJson[section].title}</ModalHeader>
          <ModalBody>{infoJson[section].text}</ModalBody>
          <ModalFooter style={{ fontSize: "0.75rem" }}>
            Read more in the{" "}
            <Link to="/information">
              <span className="mx-2 text-info"> Info </span>
            </Link>
            section
          </ModalFooter>
          <ModalFooter>
            <FormGroup check>
              <Label check>
                <Input
                  value={checkBoxSelected}
                  onClick={() => onCheckboxBtnClick()}
                  type="checkbox"
                  defaultChecked
                />{" "}
                Never show again
              </Label>
            </FormGroup>
            <Button color="primary" onClick={handleButton}>
              Gotcha!
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  );
};

export default Tutorial;
