import React, { useState, useEffect } from "react";
import { Table, Button, Progress } from "reactstrap";
import api from '../../../../api';

const getHealthBar = (dc) => {
  const percentage = (dc.currentFirewall / dc.maxFirewall) * 100;
  let color;
  switch (true) {
    case percentage > 79:
      color = "success";
      break;
    case percentage > 39:
      color = "warning";
      break;
    case percentage > 24:
      color = "danger";
      break;
    default:
      color = "danger";
  }
  return (
    <Progress
      className="mt-2"
      color={color}
      max={dc.maxFirewall}
      value={dc.currentFirewall}
    />
  );
};



const bitcoinIcon = <span style={{ color: "#F08F18" }}>&#8383;</span>;

const MiniDataCenterOverview = ({updateGlobalValues, owner}) => {
    const [dataCenters, setDataCenters] = useState([]);

    useEffect(()=>{
        const getUserDataCenters = async () => {
          const data = await api.getDataCenters({ owner });
          if (data.dataCenters && data.dataCenters.length){
            data.dataCenters.sort((a, b) => b.city.name - a.city.name);
          }
          console.log(data.dataCenters, "data.dataCenters");
          setDataCenters(data.dataCenters);
        };
        getUserDataCenters();
    },[])

    const getDataCenterActionButton = (d) => {
    const percentage = (d.currentFirewall / d.maxFirewall) * 100;
    let disabled = percentage > 100
  
    return <Button onClick={()=>handleHeal(d._id)} disabled={disabled} color="outline-warning">Heal</Button>;
};

    const handleHeal = async (id)=> {
    let data;
    try {
      data = await api.healDataCenter(id);
    } catch (err) {
        console.error('err',err)
      return updateGlobalValues(err);
    }
    setDataCenters(data.dataCenters);
    }
    const getTotalIncome = ()=>{
        if (!dataCenters.length) return

        const income = dataCenters.reduce((acc, cur) => {
          return acc + cur.minutlyrevenue;
        }, 0);
        const incomeTitle = (
          <p>
            Income:  {income}
            {bitcoinIcon}
          </p>
        );

        return incomeTitle;

    }
const tableOverview =
   dataCenters.length ? (
    <Table className="content" dark>
      <thead>
        <tr>
          {["City", "Name", "Action", "Health"].map((header) => {
            return <th key={header}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataCenters.map((d) => {
          return (
            <tr key={d._id}>
              <th scope="row">{d.city.name}</th>
              <td title={d.owner.name}> {d.name} </td>
              <td>{getDataCenterActionButton(d)}</td>
              <td>{getHealthBar(d)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <p> You don't have any datacenters </p>
  );

    return (
      <div>
        {getTotalIncome()}
        {tableOverview}
      </div>
    );
}


export default MiniDataCenterOverview;