import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FullScreenBackground = styled(Box)({
  backgroundColor: '#000000',
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const GameButton = styled(Button)({
  border: '2px solid #888888',
  fontSize: '24px',
  width: '80px',
  height: '80px',
  borderRadius: '0',
  '&:hover': {
    backgroundColor: '#111111',
  },
});

const HistoryButton = styled(Button)({
  margin: '2px 0',
  backgroundColor: '#333333',
  color: 'white',
  padding: '4px 8px',
  minWidth: 'auto',
  fontSize: '0.8rem',
  '&:hover': {
    backgroundColor: '#444444',
  },
});

let turn_count = 0;

function Square({ value, onSquareClick }) {
  return (
    <GameButton onClick={onSquareClick}>
      <span className={value === 'X' ? 'x-symbol' : 'o-symbol'}>{value}</span>
    </GameButton>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Победа ${winner === 'X' ? 'крестиков' : 'ноликов'}!`;
  } else {
    if (turn_count === 9) {
      status = 'Ничья!';
    } else {
      status = `Ход ${xIsNext ? 'крестиков' : 'ноликов'}`;
    }
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    turn_count++;
    onPlay(nextSquares);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
        {status}
      </Typography>
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </Box>
        <Box display="flex">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </Box>
        <Box display="flex">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </Box>
      </Box>
    </Box>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    turn_count = nextHistory.length - 1;
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    turn_count = nextMove;
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Ход ${move}`;
    } else {
      description = 'Начало';
    }
    return (
      <li key={move} style={{ margin: '2px 0' }}>
        <HistoryButton onClick={() => jumpTo(move)}>{description}</HistoryButton>
      </li>
    );
  });

  return (
    <FullScreenBackground>
      <Box display="flex" alignItems="flex-start" gap={4} sx={{ maxWidth: '800px', padding: '20px' }}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        
        <Box sx={{ 
          marginLeft: '20px',
          maxHeight: '400px',
          overflowY: 'auto',
          padding: '10px',
          borderLeft: '1px solid #333',
        }}>
          <Typography variant="h6" sx={{ color: 'white', marginBottom: '10px', textAlign: 'center' }}>
            История
          </Typography>
          <ul style={{ 
            listStyleType: 'none', 
            paddingLeft: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {moves}
          </ul>
        </Box>
      </Box>
    </FullScreenBackground>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}