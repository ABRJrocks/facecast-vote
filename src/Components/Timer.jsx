import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        const newSeconds = prevTime.seconds + 1;
        if (newSeconds === 60) {
          const newMinutes = prevTime.minutes + 1;
          if (newMinutes === 60) {
            return { hours: prevTime.hours + 1, minutes: 0, seconds: 0 };
          }
          return { ...prevTime, minutes: newMinutes, seconds: 0 };
        }
        return { ...prevTime, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">
        {time.hours.toString().padStart(2, '0')}:{time.minutes.toString().padStart(2, '0')}:{time.seconds.toString().padStart(2, '0')}
      </h1>
    </div>
  );
};

export default Timer;
