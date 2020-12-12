import React from 'react'
import Select from "react-select";

import {Button} from "reactstrap";

const DashboardInvite = ({
  handleInviteChange,
  selectedInvite,
  users,
  loading,
  sendInvite,
  invitedMembers,
}) => {
  console.log(invitedMembers, "=", selectedInvite);
  return (
    !loading && (
      <div className="d-flex flex-column justify-content-center">
        <div>
          {invitedMembers && invitedMembers.length ? (
            invitedMembers.map((member) => {
              console.log(member, "member");
              return <p>Member</p>;
            })
          ) : (
            <p>No pending invites</p>
          )}
        </div>
        <div className="d-flex justify-content-center">
          <Select
            className="text-dark w-50"
            value={selectedInvite}
            onChange={handleInviteChange}
            options={users}
          />
        </div>
        <div>
          <Button
            disabled={!selectedInvite}
            className="w-25"
            onClick={() => sendInvite(selectedInvite)}
          >
            Send invite
          </Button>
        </div>
      </div>
    )
  );
};

export default DashboardInvite
