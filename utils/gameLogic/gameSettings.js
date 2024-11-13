
export const PLAYER = 1;
export const AI = 2;
export const EMPTY = 0;
export const WINNING_LENGTH = 4;
export const WINNING_SCORE = 1000000000;

export const DIFFICULTY_LEVELS = {
  EASY: {
    name: 'Easy',
    depth: 2,
    randomize: true,
    randomChance: 0.3
  },
  MEDIUM: {
    name: 'Medium',
    depth: 4,
    randomize: true,
    randomChance: 0.15
  },
  HARD: {
    name: 'Hard',
    depth: 5,
    randomize: false
  }
};

export const getRandomMove = (board) => {
  const validCols = [];
  for (let col = 0; col < board[0].length; col++) {
    if (board[0][col] === EMPTY) {
      validCols.push(col);
    }
  }
  if (validCols.length === 0) return [null, null];
  
  const randomCol = validCols[Math.floor(Math.random() * validCols.length)];
  for (let row = board.length - 1; row >= 0; row--) {
    if (board[row][randomCol] === EMPTY) {
      return [row, randomCol];
    }
  }
  return [null, null];
};
