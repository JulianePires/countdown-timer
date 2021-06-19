import React, { useRef, useEffect, useState } from "react";

export default function Countdown() {
  const [num, setNum] = useState(100);
  const [pause, setPause] = useState(false);

  let intervalRef = useRef();

  const decreaseNum = () => setNum((prev) => (prev !== 0 ? prev - 1 : 0));
  const resetNum = () => setNum(100);

  useEffect(() => {
    setPause(false);
    intervalRef.current = setInterval(decreaseNum, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = () => {
    if (!pause) {
      clearInterval(intervalRef.current);
      if (num === 0) {
        clearInterval(intervalRef.current);
        setPause((prev) => !prev);
        resetNum();
        intervalRef.current = setInterval(decreaseNum, 1000);
      }
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }
    setPause((prev) => !prev);
  };

  const setLabel = () => {
    if (pause) {
      return "Run";
    } else if (num === 0) {
      return "Reset";
    } else {
      return "Pause";
    }
  };

  return (
    <div>
      <div>{num}</div>
      <button onClick={handleClick}>{setLabel()}</button>
    </div>
  );
}
