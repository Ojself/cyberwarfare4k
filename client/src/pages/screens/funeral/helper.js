const formatDateOfDeath = (stringedDate) => {
  const date = stringedDate.slice(0, 10);
  const time = stringedDate.slice(11, 19);

  return `${date} ${time}`;
};

export default formatDateOfDeath;
