import React, { useState, useEffect } from "react";

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [backgroundColor, setBackgroundColor] = useState<string>(
    getRandomColor()
  );
  const [textColor, setTextColor] = useState<string>(getRandomColor());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      setBackgroundColor(getRandomColor());
      setTextColor(getRandomColor());
    }, 10000);

    return () => clearInterval(colorChangeInterval);
  }, [backgroundColor, textColor]);

  function getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>{time.toLocaleTimeString()}</h1>
    </div>
  );
};

export default DigitalClock;
