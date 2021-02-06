import React, { useState, useEffect } from "react";
import api from "../../api";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  PopoverBody,
  Table,
  UncontrolledPopover,
} from "reactstrap";

import Tutorial from "./_molecules/Tutorial";

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
    <Col
      sm="12"
      md="6"
      lg="4"
      className="pt-4 flex-column d-flex justify-content-center align-items-center"
    >
      <h6>Add an unlisted player</h6>

      <div className="w-100">
        <Form>
          <Select
            className="text-dark "
            value={selectedOption}
            onChange={handleSelectUserChange}
            options={wantedState.loading ? "" : wantedState.users}
          />
        </Form>
      </div>
      <div className="w-100">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText
              style={{ color: "#f08f18" }}
            >
              &#8383;
            </InputGroupText>
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

      <Button
        className="w-25"
        disabled={checkDisabledAddTopButton()}
        onClick={() =>
          addBounty(selectedOption.value, wantedState.bountyTopInput)
        }
      >
        ADD
      </Button>
    </Col>
  );

  // input field for bounty on targeted user
  const ComponentBountyUsersTable = (
    <Table responsive dark>
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
    <Container>
      <Row className="d-flex justify-content-center">
        <h1>Wanted</h1>
        <Tutorial section={"Wanted Hackers"} />
      </Row>
      <h4>Cyber Criminals</h4>
      {wantedState.loading ? (
        <p>loading..</p>
      ) : (
        <>
          <Row className="justify-content-center mb-5"> {ComponentAddUnlistedPlayer} </Row>
          <Row className="justify-content-center"> {ComponentBountyUsersTable} </Row>
        </>
      )}
    </Container>
  );
};
export default WantedList;
