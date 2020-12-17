
import React, { useState } from "react";
import Select from "react-select";
import { Button, ButtonGroup } from "reactstrap";
import { getCorrectAllianceRoleName } from "../../../_helpers";

const DashboardOrganize = ({
  members,
  selectedPromotion,
  handlePromotionChange,
  promote
}) => {
  const [rSelected, setRadioSelected] = useState(null);

  const handlePromote = (title)=> {
      if (!title || !selectedPromotion)return
      const promotedUserId = selectedPromotion.value
      const devFriendlyTitle = getCorrectAllianceRoleName(title)
      promote(promotedUserId, devFriendlyTitle);
      setRadioSelected(null)
      handlePromotionChange(null);
  }
    const selectedUserAllianceRole = selectedPromotion? selectedPromotion.allianceRole : null
    if (selectedPromotion) {
      const correctRoleName = getCorrectAllianceRoleName(
        selectedUserAllianceRole
      );
      if (correctRoleName !== rSelected) setRadioSelected(correctRoleName);
    }
  return (
    <div className="d-flex flex-row justify-content-center mt-5">
      <div className="d-flex flex-column  h-25 col-5">
        <p className="w-100">Alliance members</p>
        <Select
          className="text-dark w-100"
          value={selectedPromotion}
          onChange={handlePromotionChange}
          options={members}
        />
      </div>
      <div className="col-4">
        <ButtonGroup className="d-flex flex-column">
          {[
            "Boss",
            "Analyst",
            "CTO",
            "First Lead",
            "Second Lead",
            "Code Monkey #1",
            "Code Monkey #2",
          ].map((buttonTitle, i) => {
            return (
              <Button
                disabled={!selectedPromotion}
                key={`${buttonTitle}${i}`}
                className="w-100"
                color="outline-primary"
                onClick={() => handlePromote(buttonTitle)}
                active={rSelected === buttonTitle}
              >
                {buttonTitle}
              </Button>
            );
          })}
          {/* <Button
            className="w-100 mt-2"
            color="outline-warning"
            disabled={true}
            onClick={() => toggleForumPermission(selectedPromotion)}
          >
            Kick
          </Button>
          <Button
            className="w-100 mt-2"
            color="outline-warning"
            disabled={true}
            onClick={() => toggleOrganizePermission(selectedPromotion)}
          >
            Kick
          </Button>
          <Button
            className="w-100 mt-2"
            color="outline-danger"
            disabled={true}
            onClick={() => kickMember(selectedPromotion)}
          >
            Kick
          </Button> */}
        </ButtonGroup>
      </div>
    </div>
  );
};


export default DashboardOrganize
