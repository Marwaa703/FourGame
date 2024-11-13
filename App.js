import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { GameProvider } from "./context/GameContext";
import GameBoard from "./screens/GameBoard";
import { colors } from "./constants/colors";
import Home from "./screens/Home";
import { useGame } from "./context/GameContext";

const AppContent = () => {
  const { isGameBoardVisible } = useGame();
  
  return (
    <SafeAreaView style={styles.container}>
      {!isGameBoardVisible ? <Home /> : <GameBoard />}
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
});
