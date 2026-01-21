import React, { useEffect, useState } from 'react';
import styles from './timer.module.css';

const Timer = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('timer');

    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.main_container}>
      <p className={styles.value}>{count}</p>
    </div>
  );
};

export default Timer;
