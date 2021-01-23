import React, { useEffect, useState } from "react";

import {
  Button,
  ListGroupItem,
  ListGroupItemHeading,
  Progress,
} from "reactstrap";

const ActiveSpy = ({ spy, cancelSpy, setUnreadNotification }) => {
  const [timeState, setTimeState] = useState(100 - spy.timeLeft);
  useEffect(() => {
    const runner = setInterval(() => {
      if (timeState > 103) {
        setUnreadNotification(true);
        clearInterval(runner);
      }
      setTimeState(timeState + 1);
    }, 1000);
    return () => {
      clearInterval(runner);
    };
  }, [timeState]);
  return (
    <>
      <ListGroupItem>
        <ListGroupItemHeading className="d-flex">
          <p className="m-0">
            {`Spy heading towards ${spy.target.name} - ${spy.bitCoinSpent}`}
            <span className="bitcoinColor">&#8383;</span>
          </p>
          <Button
            className="ml-auto"
            size="sm"
            color="danger"
            disabled={timeState > 90}
            onClick={() => cancelSpy(spy.id)}
          >
            Cancel
          </Button>
        </ListGroupItemHeading>
        <Progress max={103} color="info" striped animated value={timeState} />
      </ListGroupItem>
    </>
  );
};

export default ActiveSpy;
