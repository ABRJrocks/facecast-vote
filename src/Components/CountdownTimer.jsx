import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate, startTime, endTime, onTimerEnd }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date(targetDate);
    const start = new Date(target.toDateString() + " " + startTime);
    const end = new Date(target.toDateString() + " " + endTime);

    let difference = 0;

    if (now < target) {
      // If current time is before the target date, set the difference to the time until target date
      difference = target - now;
    } else if (now >= start && now <= end) {
      // If current time is between start and end time, set the difference to the time until end time
      difference = end - now;
    }

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      onTimerEnd();
    }
  }, [timeLeft, onTimerEnd]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div className="text-center" key={interval}>
        <h4 className="mb-1 text-2xl font-bold">{timeLeft[interval]}</h4>
        <p className="text-md mb-0">{interval}</p>
      </div>
    );
  });

  return (
    <div className="flex flex-row gap-3 justify-content-center">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <h3 className="text-red-600 font-semibold">Time's up!</h3>
      )}
    </div>
  );
};

export default CountdownTimer;
