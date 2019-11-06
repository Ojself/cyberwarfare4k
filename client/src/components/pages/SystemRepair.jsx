import React, { useState, useEffect } from "react";
import api from "../../api";

const SystemRepair = () => {
  const [repairState, setRepairState] = useState({
    price: null,
    message: null
  });

  useEffect(async () => {
    console.log("use effect");
  }, []);

  const handlePartial = () => {
    api.repairPartial().then(result => {
      console.log(result, "result");
    });
  };

  const handleFull = () => {
    api.repairFull().then(result => {
      console.log(result, "result");
    });
  };

  /* todo. styling. add some text about cost or whatevs */

  return (
    <div>
      <h2>System Repair</h2>
      <div>
        <div>
          <img src="/pics/partialrepair.jpg" alt="Partial Repari" />
          <button onClick={handlePartial()}>Partial repair</button>
        </div>
        <div>
          <img src="/pics/fullrepair.jpg" alt="Partial Repari" />
          <button onClick={handleFull()}>Full repair</button>
        </div>
      </div>
    </div>
  );
};

export default SystemRepair;
