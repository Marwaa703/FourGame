import {
  PLAYER,
  AI,
  EMPTY,
  WINNING_LENGTH,
  WINNING_SCORE,
  DIFFICULTY_LEVELS,
  getRandomMove,
} from "./gameSettings";

const transpositionTable = new Map();

export const checkWinner = (board, player, row, col) => {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (let [dx, dy] of directions) {
    let count = 1;
    for (let step = 1; step < 4; step++) {
      const newRow = row + step * dx;
      const newCol = col + step * dy;
      if (
        newRow < 0 ||
        newRow >= board.length ||
        newCol < 0 ||
        newCol >= board[0].length ||
        board[newRow][newCol] !== player
      )
        break;
      count++;
    }

    for (let step = 1; step < 4; step++) {
      const newRow = row - step * dx;
      const newCol = col - step * dy;
      if (
        newRow < 0 ||
        newRow >= board.length ||
        newCol < 0 ||
        newCol >= board[0].length ||
        board[newRow][newCol] !== player
      )
        break;
      count++;
    }
    if (count >= 4) return true;
  }

  return false;
};

const evaluateBoard = (board, player) => {
  if (!board || !Array.isArray(board) || board.length === 0) {
    console.error("Invalid board state in evaluateBoard");
    return 0;
  }

  let score = 0;
  const opponent = player === AI ? PLAYER : AI;

  const centerCol = Math.floor(board[0].length / 2);
  for (let row = 0; row < board.length; row++) {
    if (board[row][centerCol] === player) score += 3;
    else if (board[row][centerCol] === opponent) score -= 2;
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col] === player) {
        score += evaluatePosition(board, row, col, player);
      } else if (board[row][col] === opponent) {
        score -= evaluatePosition(board, row, col, opponent);
      }
    }
  }

  return score;
};

const evaluatePosition = (board, row, col, player) => {
  let positionScore = 0;
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (const [dx, dy] of directions) {
    let consecutive = 1;
    let openEnds = 0;
    for (const multiplier of [1, -1]) {
      for (let step = 1; step < WINNING_LENGTH; step++) {
        const newRow = row + step * dx * multiplier;
        const newCol = col + step * dy * multiplier;

        if (!isValidPosition(board, newRow, newCol)) break;

        if (board[newRow][newCol] === player) {
          consecutive++;
        } else if (board[newRow][newCol] === EMPTY) {
          openEnds++;
          break;
        } else {
          break;
        }
      }
    }
    if (consecutive >= 2) {
      positionScore += Math.pow(10, consecutive) * (openEnds + 1);
    }
  }

  return positionScore;
};

const isValidPosition = (board, row, col) => {
  return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
};

const minimax = (board, depth, alpha, beta, maximizingPlayer) => {
  if (!board || !Array.isArray(board) || board.length === 0) {
    console.error("Invalid board state in minimax");
    return [null, 0];
  }

  const boardKey =
    board.map((row) => row.join("")).join("|") + depth + maximizingPlayer;

  if (transpositionTable.has(boardKey)) {
    return transpositionTable.get(boardKey);
  }

  const validLocations = getValidLocations(board);
  const isTerminal = validLocations.length === 0 || checkBoardFull(board);

  if (depth === 0 || isTerminal) {
    if (isTerminal) {
      if (checkWinner(board, AI)) return [null, WINNING_SCORE];
      else if (checkWinner(board, PLAYER)) return [null, -WINNING_SCORE];
      else return [null, 0];
    } else return [null, evaluateBoard(board, AI)];
  }

  let bestCol = validLocations[0];
  if (maximizingPlayer) {
    let value = -Infinity;
    for (let col of validLocations) {
      const row = getNextOpenRow(board, col);
      const tempBoard = board.map((r) => [...r]);
      tempBoard[row][col] = AI;
      const newScore = minimax(tempBoard, depth - 1, alpha, beta, false)[1];
      if (newScore > value) {
        value = newScore;
        bestCol = col;
      }
      alpha = Math.max(alpha, value);
      if (alpha >= beta) break;
    }
    const result = [bestCol, value];
    transpositionTable.set(boardKey, result);
    return result;
  } else {
    let value = Infinity;
    for (let col of validLocations) {
      const row = getNextOpenRow(board, col);
      const tempBoard = board.map((r) => [...r]);
      tempBoard[row][col] = PLAYER;
      const newScore = minimax(tempBoard, depth - 1, alpha, beta, true)[1];
      if (newScore < value) {
        value = newScore;
        bestCol = col;
      }
      beta = Math.min(beta, value);
      if (alpha >= beta) break;
    }
    const result = [bestCol, value];
    transpositionTable.set(boardKey, result);
    return result;
  }
};

const getValidLocations = (board) => {
  if (!board || !Array.isArray(board) || board.length === 0) {
    return [];
  }

  const validLocations = [];
  for (let col = 0; col < board[0].length; col++) {
    if (board[0][col] === EMPTY) validLocations.push(col);
  }
  return validLocations;
};

const getNextOpenRow = (board, col) => {
  if (
    !board ||
    !Array.isArray(board) ||
    board.length === 0 ||
    col === undefined
  ) {
    return null;
  }

  for (let row = board.length - 1; row >= 0; row--) {
    if (board[row][col] === EMPTY) return row;
  }
  return null;
};

const checkBoardFull = (board) => {
  return board[0].every((cell) => cell !== EMPTY);
};

export const computerMove = (board, difficulty = DIFFICULTY_LEVELS.MEDIUM) => {
  if (!board || !Array.isArray(board) || board.length === 0) {
    console.error("Invalid board state in computerMove");
    return [null, null];
  }

  // Check if we should make a random move based on difficulty
  if (difficulty.randomize && Math.random() < difficulty.randomChance) {
    return getRandomMove(board);
  }

  transpositionTable.clear();
  const [col, score] = minimax(
    board,
    difficulty.depth,
    -Infinity,
    Infinity,
    true
  );

  if (col !== null) {
    const row = getNextOpenRow(board, col);
    if (row === null) return [null, null];
    return [row, col];
  }
  return [null, null];
};
