import React, { useCallback, useEffect, useState } from 'react';
import Grid from './components/grid/grid';
import { useGame } from './hooks/useGame';
import { CellType, StatusType } from './types';
import Header from './components/header/header';
import Button from './components/button/button';
import styles from './index.module.css';
import Modal from './components/modal/modal';

const MineSweeper = () => {
  const { grid, flags, status, openCell, toggleFlag, setNewGame } = useGame();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handleToggleFlag = (cell: CellType, e: React.MouseEvent) => {
    e.preventDefault();
    toggleFlag(cell);
  };

  const toggleModal = useCallback(
    (status: StatusType) => {
      setIsModalVisible(!isModalVisible);
    },
    [isModalVisible]
  );

  useEffect(() => {
    if (status !== 'playing') {
      toggleModal(status);
    }
  }, [status, toggleModal]);

  return (
    <div>
      <div className={styles.main_container}>
        <Header flags={flags}></Header>
        <Grid
          datas={grid}
          leftClick={openCell}
          rightClick={handleToggleFlag}
        ></Grid>
        <Button onClick={setNewGame} text={'Nouvelle partie'}></Button>
      </div>
      {isModalVisible ? <Modal status={status}></Modal> : null}
    </div>
  );
};

export default MineSweeper;
