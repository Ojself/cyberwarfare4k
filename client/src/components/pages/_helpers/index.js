const dateConverter = (isoDate) => {
  //2020-04-16T03:41:31.996Z <-- input
  isoDate = isoDate.toString();
  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Okt",
    11: "Nov",
    12: "Dec",
  };
  const year = isoDate.slice(0, 4);
  const month = months[isoDate.slice(5, 7)];
  const day = isoDate.slice(8, 10);
  const hour = isoDate.slice(11, 13);
  const min = isoDate.slice(14, 16);
  return `${day} ${month} ${year} - ${hour}:${min}`;
};

const getCorrectAllianceRoleName = (role) => {
  let output;
  switch (role) {
    case "boss":
      output = "Boss";
      break;
    case "analyst":
      output = "Analyst";
      break;
    case "cto":
      output = "CTO";
      break;
    case "firstLead":
      output = "First Lead";
      break;
    case "secondLead":
      output = "Second Lead";
      break;
    case "firstMonkeys":
      output = "Code Monkey";
      break;
    case "secondMonkeys":
      output = "Code Monkey";
      break;
    default:
      output = "missing role";
  }
  return output;
};

export { dateConverter, getCorrectAllianceRoleName };
