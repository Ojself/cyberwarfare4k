import React from 'react'

const HallOfFame = () => {
    return (
      <div className="page-container">
        <h1>Hall Of Fame</h1>
        <div className="content">
          <h6>Round 1</h6>
          <div className="my-4">
            <h2 className="text-warning">Winners</h2>
            <p>
              🥇<strong>KimDotCom</strong>
              <span style={{ color: "#F08F18" }}>&#8383;</span>
              20000
            </p>
            <p>
              🥈<strong>Xaviior</strong>
              <span style={{ color: "#F08F18" }}>&#8383;</span>
              20000
            </p>
            <p>
              🥉<strong>Billy Gates III</strong>{" "}
              <span style={{ color: "#F08F18" }}>&#8383;</span>
              20000
            </p>
          </div>
          {/* DIVIDER */}
          <div className="my-4 d-flex justify-content-around">
            <div className="w-50">
              <h5 className="text-warning">Top alliances</h5>
              <p>
                <strong>1.</strong> Black{" "}
                <span style={{ color: "#F08F18" }}>&#8383;</span>
                20000
              </p>
              <p>
                <strong>2.</strong> White{" "}
                <span style={{ color: "#F08F18" }}>&#8383;</span>
                20000
              </p>
              <p>
                <strong>3.</strong> Grey{" "}
                <span style={{ color: "#F08F18" }}>&#8383;</span>
                20000
              </p>
            </div>

            {/* DIVIDER */}
            <div className="w-50">
              <h5 className="text-warning">Most crimes</h5>
              <p>
                <strong>1.</strong> KimDotCom
              </p>
              <p>
                <strong>2.</strong> Xaviior
              </p>
              <p>
                <strong>3.</strong> Billy Gates III
                <span style={{ color: "#F08F18" }}>&#8383;</span>
                20000
              </p>
            </div>
          </div>
          {/* DIVIDER */}

          <div className="my-4 d-flex justify-content-around">
            <div className="w-50">
              <h5 className="text-warning">Most VPN changes</h5>
              <p>
                <strong>1.</strong> KimDotCom
              </p>
              <p>
                <strong>2.</strong> Xaviior
              </p>
              <p>
                <strong>3.</strong> Billy Gates III
                <span style={{ color: "#F08F18" }}>&#8383;</span>
                20000
              </p>
            </div>
            {/* DIVIDER */}
            <div className="w-50">
              <h5 className="text-warning">Most experience</h5>
              <p>
                <strong>1.</strong> KimDotCom
              </p>
              <p>
                <strong>2.</strong> Xaviior
              </p>
              <p>
                <strong>3.</strong> Billy Gates III
                <span style={{ color: "#F08F18" }}>&#8383;</span>
                20000
              </p>
            </div>
          </div>

          <div className="my-4 d-flex justify-content-around">
            <div className="w-50">
              <h5 className="text-warning">Most crypto purchases</h5>
              <p>
                <strong>1.</strong> KimDotCom
              </p>
              <p>
                <strong>2.</strong> Xaviior
              </p>
              <p>
                <strong>3.</strong> Billy Gates III
                <span style={{ color: "#F08F18" }}>&#8383;</span>
                20000
              </p>
            </div>
            {/* DIVIDER */}
            <div className="w-50">
              <h5 className="text-warning">Best Newcomer</h5>
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
}

export default HallOfFame
