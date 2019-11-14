import React, { useState, useEffect } from "react";

const Row = props => {
  const [value, setValue] = useState(0);
  const [renderInterval, setRenderInterval] = useState(null);

  useEffect(() => {
    const interval = setInterval(counterIntervalFunction, props.speed);
    setRenderInterval(interval);
  }, []);
  const counterIntervalFunction = () => {
    if (props.isRunning && props.direction === "ltr") {
      setValue(Math.floor(Math.random() * 2));
      props.setRotatingValue(props.index, value);
    } else if (props.isRunning && props.direction === "rtl") {
      setValue(Math.floor(Math.random() * 2));
      props.setRotatingValue(props.index, value);
    } else {
      console.log("clearing");
      clearCounterInterval();
    }
  };

  const clearCounterInterval = () => {
    clearInterval(renderInterval);
  };

  // determines which row we are dealing with [0,1,2]
  const activeRowIndex = props.data.activeRowIndex;
  // to see which will stop when keypress. adds "active" to class
  const activeClass = props.index === activeRowIndex ? "active" : "";
  // adds 'top', 'center', or 'bottom' to class
  const columnsClassList = "columns columns-" + props.name;
  // adds active active to row to wrapper
  const wrapperClassList = "row " + activeClass;
  // sets animation: 'rtl-transition-[0,1,2]
  const animation = props.direction + "-transition-" + value;
  console.log(animation, "animation");

  const style = {
    animationName: animation,
    animationDuration: props.speed + "ms" // 200
  };

  return (
    <div className={wrapperClassList}>
      <div className={columnsClassList} style={style}>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
      </div>
    </div>
  );
};
export default Row;
