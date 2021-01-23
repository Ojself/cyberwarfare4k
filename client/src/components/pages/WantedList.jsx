import React, { useState, useEffect } from "react";
import api from "../../api";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  PopoverBody,
  Table,
  UncontrolledPopover,
  UncontrolledTooltip,
} from "reactstrap";

/* todo */
/* rerender after add */
/* styling */

const WantedList = ({ updateGlobalValues, user }) => {
  const [wantedState, setWantedState] = useState({
    users: [],
    bountyUsers: [],
    loading: true,
    bountyTopInput: "",
  });
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchWantedUsers = async () => {
      const apiWantedUsers = await api.getWantedUsers();
      const massagedUser = dataMassagerForSelectComponent(apiWantedUsers.users);
      setWantedState({
        ...wantedState,
        users: massagedUser,
        bountyUsers: apiWantedUsers.bountyUsers,
        loading: false,
      });
    };
    fetchWantedUsers();
  }, []);

  const handleSelectUserChange = (eventValue) => {
    setSelectedOption(eventValue);
  };

  const handleInputChange = (e) => {
    setWantedState({
      ...wantedState,
      [e.target.name]: e.target.value,
    });
  };

  /* todo, this is being used many times */
  const dataMassagerForSelectComponent = (userArray) => {
    return userArray.map((u) => {
      return {
        value: u._id,
        label: u.name,
      };
    });
  };

  const addBounty = async (bountyTargetId, bounty, clearName = "") => {
    const result = await api.addBounty({ bounty, bountyTargetId });
    updateGlobalValues(result);
    const massagedUser = dataMassagerForSelectComponent(result.users);
    setWantedState({
      ...wantedState,
      bountyTopInput: "",
      users: massagedUser,
      bountyUsers: result.bountyUsers,
      [clearName]: 0,
    });
  };

  const checkDisabledAddTopButton = () => {
    if (
      selectedOption &&
      selectedOption.label &&
      wantedState.bountyTopInput &&
      wantedState.bountyTopInput >= 1000
    ) {
      return false;
    }
    return true;
  };
  const checkDisabledButton = (name) => {
    if (name && wantedState[name] && wantedState[name] >= 1000) {
      return false;
    }
    return true;
  };

  // select form
  const ComponentAddUnlistedPlayer = (
    <div className="pt-4 w-100 flex-column d-flex justify-content-center align-items-center">
      <h6>Add an unlisted player</h6>
      <div className="w-25">
        <Form>
          <Select
            className="text-dark "
            value={selectedOption}
            onChange={handleSelectUserChange}
            options={wantedState.loading ? "" : wantedState.users}
          />
        </Form>
      </div>
      <div className="w-25">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="bitcoinColor">&#8383;</InputGroupText>
          </InputGroupAddon>
          <Input
            type="number"
            min={1000}
            step="1000"
            placeholder="Amount"
            value={wantedState.bountyTopInput}
            name="bountyTopInput"
            onChange={handleInputChange}
          />
        </InputGroup>
      </div>
      <div className="m-3 mb-4 w-20" id="AddTopBountyToolTip">
        <Button
          disabled={checkDisabledAddTopButton()}
          onClick={() =>
            addBounty(selectedOption.value, wantedState.bountyTopInput)
          }
        >
          ADD
        </Button>
      </div>
      <UncontrolledTooltip placement="right" target="AddTopBountyToolTip">
        Click to add bounty
      </UncontrolledTooltip>
    </div>
  );

  // input field for bounty on targeted user
  const ComponentBountyUsersTable = (
    <Table dark>
      <thead>
        <tr>
          {["Name", "Alliance", "Bank", "Donors", "Bounty", "Add Bounty"].map(
            (header) => {
              return <th key={header}>{header}</th>;
            }
          )}
        </tr>
      </thead>
      <tbody>
        {wantedState.bountyUsers.map((user, i) => (
          <tr key={user._id}>
            <th scope="row">
              <Link className="text-light" to={`/hacker/${user._id}`}>
                {user.name}
              </Link>
            </th>
            <td>
              {user.alliance ? (
                <Link
                  className="text-light"
                  to={`/alliance/${user.alliance._id}`}
                >
                  {user.alliance.name}
                </Link>
              ) : (
                <p> - </p>
              )}
            </td>
            <td>{user.playerStats.rankName}</td>
            <td>
              <Button id={`PopoverFocus${i}`} type="button">
                {user.playerStats.bountyDonors.length}
              </Button>
              <UncontrolledPopover
                placement="right"
                target={`PopoverFocus${i}`}
              >
                <PopoverBody>
                  {user.playerStats.bountyDonors.map((d, j) => (
                    /* needs styling so it's an actual list */
                    <ul className="pl-0 my-1">
                      <Link key={j} to={`/hacker/${d._id}`}>
                        {d.name}
                      </Link>
                    </ul>
                  ))}
                </PopoverBody>
              </UncontrolledPopover>
            </td>

            <td className="text-right">
              <span className="bitcoinColor">&#8383;</span>
              {user.playerStats.bounty}
            </td>
            <td>
              <InputGroup>
                <Input
                  step={1000}
                  min={1000}
                  type="number"
                  name={user.name}
                  value={wantedState[user.name]}
                  onChange={handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    onClick={() =>
                      addBounty(user._id, wantedState[user.name], user.name)
                    }
                    disabled={checkDisabledButton(user.name)}
                    name={user.name}
                  >
                    ADD BOUNTY
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div className="page-container">
      <h1>Wanted</h1>
      <h3>Cyber Criminals</h3>
      {wantedState.loading ? (
        <p>loading..</p>
      ) : (
        <>
          <div> {ComponentAddUnlistedPlayer} </div>
          <div className="content"> {ComponentBountyUsersTable} </div>
        </>
      )}
    </div>
  );
};
export default WantedList;
