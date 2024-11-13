import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [isGameBoardVisible, setIsGameBoardVisible] = useState(false);

  const handleGameModeSelection = (mode) => {
    if (mode === "computer") {
      setGameMode("difficultySelection");
    } else {
      setGameMode("player");
      setIsGameBoardVisible(true);
    }
  };

  const handleDifficultySelection = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setGameMode("computer");
    setIsGameBoardVisible(true);
  };

  const handleBackToMenu = () => {
    setGameMode(null);
    setDifficulty(null);
    setIsGameBoardVisible(false);
  };

  const value = {
    gameMode,
    difficulty,
    showRules,
    isGameBoardVisible,
    setShowRules,
    handleGameModeSelection,
    handleDifficultySelection,
    handleBackToMenu,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
