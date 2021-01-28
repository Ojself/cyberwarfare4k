import React, { useEffect, useState } from "react";
import api from "../../../api";
import FuneralCard from "./FuneralCard";

const Funeral = () => {
  const [funeralMembers, setFuneralMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFunerals = async ({ updateGlobalValues }) => {
      let data;
      try {
        data = await api.getFunerals();
      } catch (err) {
        console.error("Error: ", err);
        updateGlobalValues(err);
      }
      setFuneralMembers(data.funeralMembers);
      updateGlobalValues(updateGlobalValues);
      setLoading(false);
    };
    getFunerals();
  }, []);
  return (
    <div>
      <h1>Funeral</h1>
    </div>
  );
};

export default Funeral;
