import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { colors } from "../constants/colors";
import { checkWinner, computerMove } from "../utils/gameLogic/gameLogic";
import { useGame } from "../context/GameContext";
import SecondaryButton from "../components/SecondaryButton";
import Logo from "../components/Logo";
import GameOverModal from "../components/GameOverModal";

const GameBoard = () => {
  const { gameMode, difficulty, handleBackToMenu } = useGame();

  const rows = 6;
  const cols = 7;

  const [board, setBoard] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const deepCopyBoard = (board) => board.map((row) => [...row]);

  const handleDrop = (col) => {
    if (isGameOver || currentPlayer === "Computer") return;

    if (board[0][col] !== null) {
      return;
    }

    const newBoard = deepCopyBoard(board);
    let placed = false;

    for (let row = rows - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        placed = true;
        setBoard(newBoard);
        if (checkWinner(newBoard, currentPlayer, row, col)) {
          handleGameOver(currentPlayer);
          return;
        }
        if (isBoardFull(newBoard)) {
          handleGameOver("draw");
          return;
        }

        break;
      }
    }

    if (placed) {
      setCurrentPlayer(
        gameMode === "computer"
          ? "Computer"
          : currentPlayer === "Player 1"
          ? "Player 2"
          : "Player 1"
      );
    }
  };

  const isBoardFull = (board) => {
    return board[0].every((cell) => cell !== null);
  };

  useEffect(() => {
    if (
      currentPlayer === "Computer" &&
      gameMode === "computer" &&
      !isGameOver
    ) {
      const timeoutId = setTimeout(() => {
        const numericBoard = board.map((row) =>
          row.map((cell) => {
            if (cell === null) return 0;
            if (cell === "Player 1") return 1;
            if (cell === "Computer") return 2;
            return 0;
          })
        );

        const [row, col] = computerMove(numericBoard, difficulty);

        if (row !== null && col !== null) {
          const newBoard = deepCopyBoard(board);
          newBoard[row][col] = "Computer";

          setBoard(newBoard);

          if (checkWinner(newBoard, "Computer", row, col)) {
            handleGameOver("Computer");
            return;
          }

          if (isBoardFull(newBoard)) {
            handleGameOver("draw");
            return;
          }

          setCurrentPlayer("Player 1");
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [currentPlayer, board, gameMode, isGameOver, difficulty]);

  const resetGame = () => {
    setBoard(Array.from({ length: rows }, () => Array(cols).fill(null)));
    setCurrentPlayer("Player 1");
    setIsGameOver(false);
    setWinner(null);
  };

  const handleGameOver = (winner) => {
    setWinner(winner);
    setIsGameOver(true);
    setModalVisible(true);
  };

  const handleReset = () => {
    setModalVisible(false);
    // resetGame();
  };

  return (
    <View style={styles.container}>
      <GameOverModal
        visible={modalVisible}
        winner={winner}
        resetGame={handleReset}
      />
      <View style={styles.header}>
        <SecondaryButton text="Restart" onClick={resetGame} />
        <Logo />
        <SecondaryButton text="Menu" onClick={handleBackToMenu} />
      </View>
      <View style={styles.currentPlayerContainer}>
        <Text style={styles.currentPlayer}>{currentPlayer}</Text>
      </View>
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <View
                key={colIndex}
                style={[
                  styles.cell,
                  {
                    backgroundColor: cell
                      ? cell === "Player 1"
                        ? colors.p1
                        : colors.p2
                      : colors.cellBg,
                  },
                ]}
                onTouchEnd={() => handleDrop(colIndex)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 20,
    marginVertical: 60,
  },
  currentPlayerContainer: {
    backgroundColor: colors.text,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  currentPlayer: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  board: {
    padding: 10,
    backgroundColor: colors.boardBg,
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 45,
    height: 45,
    margin: 3,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default GameBoard;
