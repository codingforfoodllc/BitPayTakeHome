import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface CountDownTimerProps {
  startTime: number;
  countDownCompleted: () => void;
}
const CountDownTimer = ({
  startTime,
  countDownCompleted,
}: CountDownTimerProps) => {
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

  return <CountDownContainer>{count}</CountDownContainer>;
};

const CountDownContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 9999px;
  background-color: red;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

export default CountDownTimer;
