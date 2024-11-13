import React from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import { useGame } from "../context/GameContext";
import MainButton from "../components/MainButton";
import Logo from "../components/Logo";
import { colors } from "../constants/colors";
import { DIFFICULTY_LEVELS } from "../utils/gameLogic/gameSettings";
import GameRules from "../components/GameRules";

export default function Home() {
  const {
    gameMode,
    showRules,
    setShowRules,
    handleGameModeSelection,
    handleDifficultySelection,
  } = useGame();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showRules}
        onRequestClose={() => setShowRules(false)}
      >
        <View style={styles.modalView}>
          <GameRules />
          <MainButton
            text="Close"
            bgColor={colors.p3}
            onClick={() => setShowRules(false)}
          />
        </View>
      </Modal>

      {gameMode === null ? (
        <View style={styles.menu}>
          <MainButton
            text="Player VS Player"
            bgColor={colors.p1}
            onClick={() => handleGameModeSelection("player")}
          />
          <MainButton
            text="Player VS Computer"
            bgColor={colors.p2}
            onClick={() => handleGameModeSelection("computer")}
          />
          <MainButton
            text="Game Rules"
            bgColor={colors.text}
            onClick={() => setShowRules(true)}
          />
        </View>
      ) : (
        gameMode === "difficultySelection" && (
          <View style={styles.menu}>
            <Text style={styles.title}>Player VS Computer</Text>
            <Text style={styles.title}>Select Difficulty</Text>
            {Object.values(DIFFICULTY_LEVELS).map((level) => (
              <MainButton
                key={level.name}
                text={level.name}
                bgColor={colors.p2}
                onClick={() => handleDifficultySelection(level)}
              />
            ))}
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    marginBottom: 50,
  },
  menu: {
    width: "90%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.text,
  },
  modalView: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    height:"auto",
  },
});
