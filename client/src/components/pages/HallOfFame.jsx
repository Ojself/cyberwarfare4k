import React from "react";

const HallOfFame = ({ updateGlobalValues, user }) => {
  return (
    <div className="page-container">
      <h1>Hall Of Fame</h1>
      <div className="content">
        <h6>Round 1</h6>
        <div className="my-4">
          <h2 className="text-warning">Winners</h2>
          <p>
            <span role="img" aria-label="subscription-icon">
              🥇
            </span>
            <strong>KimDotCom</strong>{" "}
            <span className="bitcoinColor">&#8383;</span>
            21268594
          </p>
          <p>
            <span role="img" aria-label="subscription-icon">
              🥈
            </span>
            <strong>Xaviior</strong>{" "}
            <span className="bitcoinColor">&#8383;</span>
            15507711
          </p>
          <p>
            <span role="img" aria-label="subscription-icon">
              🥉
            </span>
            <strong>R3v3ng3</strong>{" "}
            <span className="bitcoinColor">&#8383;</span>
            11842806
          </p>
        </div>
        {/* DIVIDER */}
        <div className="my-4 d-flex justify-content-around">
          <div className="w-50">
            <h5 className="text-warning">Top alliances</h5>
            <p>
              <strong>1.</strong> Black{" "}
              <span className="bitcoinColor">&#8383;</span>
              48079110
            </p>
            <p>
              <strong>2.</strong> White{" "}
              <span className="bitcoinColor">&#8383;</span>
              11423073
            </p>
            <p>
              <strong>3.</strong> Grey{" "}
              <span className="bitcoinColor">&#8383;</span>
              23800
            </p>
          </div>

          {/* DIVIDER */}
          <div className="w-50">
            <h5 className="text-warning">Most crimes</h5>
            <p>
              <strong>1.</strong> Billy Gates III (225)
            </p>
            <p>
              <strong>2.</strong> KimDotCom (204)
            </p>
            <p>
              <strong>3.</strong> Xaviior (188)
            </p>
          </div>
        </div>
        {/* DIVIDER */}

        <div className="my-4 d-flex justify-content-around">
          <div className="w-50">
            <h5 className="text-warning">Most VPN changes</h5>
            <p>
              <strong>1.</strong> NGVY3N (25)
            </p>
            <p>
              <strong>2.</strong> KimDotCom (22)
            </p>
            <p>
              <strong>3.</strong> Xaviior (18)
            </p>
          </div>
          {/* DIVIDER */}
          <div className="w-50">
            <h5 className="text-warning">Most experience</h5>
            <p>
              <strong>1.</strong> R3v3ng3 (28K)
            </p>
            <p>
              <strong>2.</strong> KimDotCom (27K)
            </p>
            <p>
              <strong>3.</strong> Admin_Tor (25K)
            </p>
          </div>
        </div>

        <div className="my-4 d-flex justify-content-around">
          <div className="w-50">
            <h5 className="text-warning">Most crypto purchases</h5>
            <p>
              <strong>1.</strong> KimDotCom (111)
            </p>
            <p>
              <strong>2.</strong> R3v3ng3 (77)
            </p>
            <p>
              <strong>3.</strong> Billy Gates III (74)
            </p>
          </div>
          {/* DIVIDER */}
          <div className="w-50">
            <h5 className="text-warning">
              Best Newcomer{" "}
              <span role="img" aria-label="subscription-icon">
                🚀
              </span>
            </h5>
            <p>
              <strong>1.</strong> Billy Gates III
            </p>
            <p>
              <strong>2.</strong> NGVY3N
            </p>
            <p>
              <strong>3.</strong> KranseKake
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;
