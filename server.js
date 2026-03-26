const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Game state
let gameState = {
  currentScreen: 'qr', // qr, wordcloud, emoji
  currentQuestion: 0, // 0 or 1 for wordcloud questions
  wordCloudData: {
    question1: {}, // {word: count}
    question2: {}
  },
  emojiRound: 0, // 0-3
  emojiAnswers: {},
  playerCount: 0
};

const emojiRounds = [
  { emoji: '❤️', answer: 'LOVE' },
  { emoji: '👨‍👦', answer: 'SON' },
  { emoji: '🎁', answer: 'GAVE' },
  { emoji: '🌱', answer: 'LIFE' }
];

const wordCloudQuestions = [
  "What are people searching for?",
  "What is love?"
];

// Generate QR code endpoint
app.get('/qr', async (req, res) => {
  try {
    const playerUrl = `${req.protocol}://${req.get('host')}/player.html`;
    const qrImage = await QRCode.toDataURL(playerUrl);
    res.json({ qr: qrImage, url: playerUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Socket.io connections
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Send current game state to new connection
  socket.emit('gameState', gameState);

  // Player joined
  socket.on('playerJoined', () => {
    gameState.playerCount++;
    io.emit('playerCount', gameState.playerCount);
  });

  // Controller actions
  socket.on('changeScreen', (screen) => {
    gameState.currentScreen = screen;
    io.emit('gameState', gameState);
  });

  socket.on('setWordCloudQuestion', (questionIndex) => {
    gameState.currentQuestion = questionIndex;
    io.emit('gameState', gameState);
  });

  socket.on('setEmojiRound', (round) => {
    gameState.emojiRound = round;
    gameState.emojiAnswers = {}; // Reset answers for new round
    io.emit('gameState', gameState);
  });

  socket.on('resetWordCloud', (questionIndex) => {
    if (questionIndex === 0) {
      gameState.wordCloudData.question1 = {};
    } else {
      gameState.wordCloudData.question2 = {};
    }
    io.emit('gameState', gameState);
  });

  socket.on('resetAll', () => {
    gameState = {
      currentScreen: 'qr',
      currentQuestion: 0,
      wordCloudData: { question1: {}, question2: {} },
      emojiRound: 0,
      emojiAnswers: {},
      playerCount: 0
    };
    io.emit('gameState', gameState);
  });

  // Player submissions
  socket.on('submitWord', (data) => {
    const { questionIndex, word } = data;
    const cleanWord = word.trim().toUpperCase();

    if (cleanWord) {
      const questionKey = questionIndex === 0 ? 'question1' : 'question2';
      if (!gameState.wordCloudData[questionKey][cleanWord]) {
        gameState.wordCloudData[questionKey][cleanWord] = 0;
      }
      gameState.wordCloudData[questionKey][cleanWord]++;
      io.emit('wordCloudUpdate', { questionIndex, data: gameState.wordCloudData[questionKey] });
    }
  });

  socket.on('submitEmojiGuess', (data) => {
    const { playerId, guess } = data;
    const cleanGuess = guess.trim().toUpperCase();
    const currentAnswer = emojiRounds[gameState.emojiRound].answer;

    gameState.emojiAnswers[playerId] = {
      guess: cleanGuess,
      correct: cleanGuess === currentAnswer
    };

    io.emit('emojiAnswersUpdate', gameState.emojiAnswers);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
    gameState.playerCount = Math.max(0, gameState.playerCount - 1);
    io.emit('playerCount', gameState.playerCount);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT}/display.html for the projector view`);
  console.log(`Open http://localhost:${PORT}/controller.html for the controller`);
});
