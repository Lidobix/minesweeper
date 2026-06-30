'use client';

import MineSweeper from './src/features/game';
import { GameProvider } from './src/features/game/contexts/gameContext';
import './globals.css';
import Modal from './src/components/modal/modal';
import Header from './src/components/header/header';
import Footer from './src/components/footer/footer';

import { useCallback, useState } from 'react';

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalVisible((prev) => !prev);
  }, [setIsModalVisible]);

  return (
    <GameProvider>
      <Header onClick={toggleModal}></Header>

      <main
      // style={{
      //   background: 'red',
      // }}
      >
        <MineSweeper style={{ flex: 1 }}></MineSweeper>
      </main>
      {isModalVisible ? (
        <Modal isOpen={isModalVisible} toggle={toggleModal}></Modal>
      ) : null}

      <Footer></Footer>
    </GameProvider>
  );
}
