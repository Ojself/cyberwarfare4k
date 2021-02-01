import React from "react";

import FAQ from "./FAQ";
import INFO from "./INFO";

const Information = ({}) => {
  return (
    <div className="page-container d-flex flex-column justify-content-center">
      <h6>
        Current Round: <strong className="text-warning">3</strong>
      </h6>
      <h6>
        Round ends: <strong className="text-warning">01.03</strong>
      </h6>
      <FAQ />
      <INFO />
    </div>
  );
};

export default Information;
