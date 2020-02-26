import React, { useEffect } from "react";
function Row(props) {
  const renderInterval = React.useRef();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    renderInterval.current = setInterval(
      counterIntervalFunction,
      props.isRunning,
      props.direction,
      props.setRotatingValue,
      props.index
    );
    return () => {
      clearInterval(renderInterval.current);
    };
  }, [props, counterIntervalFunction]);

  const counterIntervalFunction = React.useCallback(
    (isRunning, direction, setRotatingValue, index) => {
      if (isRunning === false) {
        return;
      }
      console.log("a");
      if (direction === "ltr") {
        const ltrNewValue = value === 2 ? 0 : value + 1;
        setValue(ltrNewValue);
        console.log(props.index, "index");
        props.setRotatingValue(props.index, ltrNewValue);
      } else if (props.direction === "rtl") {
        const rtlNewValue = value === 0 ? 2 : value - 1;
        setValue(rtlNewValue);
        props.setRotatingValue(props.index, rtlNewValue);
      }
    },
    [value]
  );

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
}

export default Row;
