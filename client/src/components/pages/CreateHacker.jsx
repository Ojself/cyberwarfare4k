import React, { useState, useEffect } from "react";
import api from "../../api";

const CreateHacker = () => {
  const [createState, setCreateState] = useState({
    loading: true,
    message: null,
    user: null,
    success: true,
    name: "",
    city: ""
  });

  useEffect(() => {
    console.log("using effect, createhacker");
    api
      .getUser()
      .then(result => {
        setCreateState({
          ...createState,
          message: result.message,
          loading: false,
          user: result.user
        });

        setTimeout(() => {
          setCreateState({
            ...createState,
            message: null
          });
        }, 2000);
      })
      .catch(err => console.log(err));
    console.log(createState);
  }, []);

  const handleInputChange = e => {
    setCreateState({
      ...createState,
      [e.target.name]: e.target.value
    });
  };

  const handleClick = e => {
    e.preventDefault();
    const data = {
      name: createState.name,
      cityString: createState.city
    };
    api
      .createUser(data)
      .then(result => {
        console.log("SUCCESS!");
        setCreateState({
          ...createState,
          message: `Your user '${createState.name}' has been created`
        });
        setTimeout(() => {
          setCreateState({
            ...createState,
            message: ""
          });
        }, 2000);
      })
      .catch(err =>
        setCreateState({ ...createState, message: err.toString() })
      );
  };

  const handleUpgrade = e => {
    e.preventDefault();
    console.log(e.target.name, "e.target");
    const data = e.target.name;
    api
      .upgradeStats(data)
      .then(result => {
        console.log("SUCCESS!", result);
        /* make screen blink green? */
        setCreateState({
          ...createState,
          message: `${result.message}`
        });
        setTimeout(() => {
          setCreateState({
            ...createState,
            message: null
          });
        }, 2000);
      })
      .catch(err =>
        setCreateState({ ...createState, message: err.toString() })
      );
  };

  return (
    <div className="CreateHacker">
      <h2>Create a haxor</h2>
      <form>
        Name:{" "}
        <input
          type="text"
          value={createState.name}
          name="name"
          onChange={handleInputChange}
        />{" "}
        <br />
        <h2>
          Statpoints:{" "}
          {createState.loading ? 0 : createState.user.playerStats.statPoints}
        </h2>
        CPU:{" "}
        <button name="cpu" onClick={handleUpgrade}>
          CPU
        </button>
        <button name="Antivirus" onClick={handleUpgrade}>
          AVS
        </button>
        <button name="Encryption" onClick={handleUpgrade}>
          Encryption
        </button>
        <br />
        city:{" "}
        <input
          type="text"
          value={createState.city}
          name="city"
          onChange={handleInputChange}
        />{" "}
        <br />
        <br />
        <br />
        <button onClick={e => handleClick(e)}>Create haxor</button>
      </form>
      {createState.message && <div className="info">{createState.message}</div>}
    </div>
  );
};
export default CreateHacker;
