import { useContext, useEffect } from 'react';
import { GameContext } from '../context/gameContext';

export const useTimer = () => {
  const { status, setTime } = useContext(GameContext);

  useEffect(() => {
    if (status !== 'playing') return;

    const id = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [status, setTime]);
};
