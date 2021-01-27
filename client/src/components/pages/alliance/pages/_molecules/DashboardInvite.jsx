import React from "react";
import Select from "react-select";

import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const DashboardInvite = ({
  handleInviteChange,
  selectedInvite,
  users,
  loading,
  sendInvite,
  invitedMembers,
  rejectInvitation,
}) => {
  return (
    !loading && (
      <div className="d-flex flex-column justify-content-center">
        <div className="my-5 d-flex flex-column align-items-center">
          <h4>Invited members</h4>
          {invitedMembers && invitedMembers.length ? (
            invitedMembers.map((member) => {
              return (
                <div
                  key={member._id}
                  className="d-flex justify-content-around w-50"
                >
                  <Link to={`/hacker/${member._id}`}>{member.name}</Link>

                  <Button
                    size="sm"
                    onClick={() => rejectInvitation(member._id)}
                    color="outline-danger"
                  >
                    Reject
                  </Button>
                </div>
              );
            })
          ) : (
            <p>No pending invites</p>
          )}
        </div>
        {/* Divider */}
        <div style={{ borderBottom: "solid 1px grey" }}></div>
        <h4 className="my-3">New invite</h4>
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
            className="w-25 mt-2"
            onClick={() => sendInvite(selectedInvite)}
          >
            Send invite
          </Button>
        </div>
      </div>
    )
  );
};

export default DashboardInvite;
