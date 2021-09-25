import { useEffect, useRef, useState } from "react";

interface CountDownTimerProps {
  startTime: number;
  countDownCompleted: () => void;
}
const CountDownTimer = ({
  startTime,
  countDownCompleted,
}: CountDownTimerProps) => {
  //const defaultTime = 5;

  // const [seconds, setSeconds] = useState<number>(defaultTime);

  // useEffect(() => {
  //   seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
  // }, [seconds]);

  // return (
  //   <div>
  //     <div>Countdown: {seconds}</div>
  //   </div>
  // );

  const [count, setCount] = useState(startTime);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current!);
    };
  }, [timerRef, setCount]);

  useEffect(() => {
    if (count <= 0) {
      setCount(startTime);
      countDownCompleted();
    }
  }, [count, countDownCompleted, startTime]);

  return <div>{count}</div>;
};
export default CountDownTimer;
