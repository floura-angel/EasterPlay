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

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Game state
let gameState = {
  currentScreen: 'qr',
  currentQuestion: 0,
  wordCloudData: {
    question1: {},
    question2: {},
    question3: {},
    question4: {},
    question5: {}
  },
  emojiRound: 0,
  emojiAnswers: {},
  playerCount: 0
};

const emojiRounds = [
  { emoji: '❤️', answer: 'LOVE' },
  { emoji: '🌍', answer: 'WORLD' },
  { emoji: '🎁', answer: 'GAVE' },
  { emoji: '👦', answer: 'SON' },
  { emoji: '🌱', answer: 'LIFE' }
];

const wordCloudQuestions = [
  "Say one word you think of when you hear 'God.'",
  "Say one word for love.",
  "Say one word for the best gift ever.",
  "Say one word for how you're feeling today.",
  "Say one word for something that makes you smile."
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

  socket.emit('gameState', gameState);

  socket.on('playerJoined', () => {
    gameState.playerCount++;
    io.emit('playerCount', gameState.playerCount);
  });

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
    gameState.emojiAnswers = {};
    io.emit('gameState', gameState);
  });

  socket.on('resetWordCloud', (questionIndex) => {
    const questionKey = `question${questionIndex + 1}`;
    if (gameState.wordCloudData[questionKey] !== undefined) {
      gameState.wordCloudData[questionKey] = {};
    }
    io.emit('gameState', gameState);
  });

  socket.on('resetAll', () => {
    gameState = {
      currentScreen: 'qr',
      currentQuestion: 0,
      wordCloudData: { question1: {}, question2: {}, question3: {}, question4: {}, question5: {} },
      emojiRound: 0,
      emojiAnswers: {},
      playerCount: 0
    };
    io.emit('gameState', gameState);
  });

  socket.on('submitWord', (data) => {
    const { questionIndex, word } = data;
    const cleanWord = word.trim().toUpperCase();

    if (cleanWord) {
      const questionKey = `question${questionIndex + 1}`;
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

  socket.on('revealAnswer', () => {
    io.emit('revealAnswer');
  });

  socket.on('showVerse', (mode) => {
    io.emit('showVerse', { mode });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
    gameState.playerCount = Math.max(0, gameState.playerCount - 1);
    io.emit('playerCount', gameState.playerCount);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
