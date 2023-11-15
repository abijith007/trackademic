import React, { useState, useEffect } from 'react';

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <h5 className="text-2xl font-semibold mb-2">Time</h5>
      <div className="flex gap-2 text-center">
        <div className="flex flex-col bg-white p-3 shadow-xl rounded-2xl">
          <span className="countdown font-mono text-5xl">
            {formatTime(time.getHours())}
          </span>
          hours
        </div>
        <span className="text-5xl my-auto">:</span>
        <div className="flex flex-col bg-white p-3 shadow-xl rounded-2xl">
          <span className="countdown font-mono text-5xl">
            {formatTime(time.getMinutes())}
          </span>
          min
        </div>
      </div>
    </div>
  );
}

export default DigitalClock;
