# Interactive Game - Word Cloud & Emoji Guessing

A real-time interactive game with three views:
- **Display** (projector): Shows QR code, word clouds, and emoji rounds
- **Controller** (you): Control which screen shows and game flow
- **Player** (audience): Join via QR code and participate

## Features

### 1. Word Cloud Game
- Question 1: "What are people searching for?"
- Question 2: "What is love?"
- Live word cloud updates as audience submits words

### 2. Emoji Guessing Game
Four rounds:
- Round 1: ❤️ = LOVE
- Round 2: 👨‍👦 = SON
- Round 3: 🎁 = GAVE
- Round 4: 🌱 = LIFE

## Quick Deploy to Vercel (FREE)

### Option 1: Deploy with Vercel CLI (2 minutes)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd /workarea/docs
   vercel
   ```

3. **Follow the prompts:**
   - Login to Vercel (creates free account if needed)
   - Confirm project settings (just press Enter for defaults)
   - Done! You'll get a URL like `your-game.vercel.app`

### Option 2: Deploy via Vercel Website (3 minutes)

1. Push this folder to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Done!

## How to Use

Once deployed, you'll have a URL like `https://your-game.vercel.app`

### Setup:
1. Open `https://your-game.vercel.app/display.html` on your projector/screen
2. Open `https://your-game.vercel.app/controller.html` on your phone/laptop
3. The display will show a QR code
4. Audience scans QR code → takes them to player view

### Running the Game:

**Controller buttons:**
- "Show QR Code" - Display QR for audience to join
- "Show Word Cloud" - Switch to word cloud view
- "Question 1/2" - Choose which question
- "Show Emoji Game" - Start emoji guessing
- "Round 1-4" - Select emoji round
- "Reveal Answer" - Show the correct answer
- "Reset" - Clear data and start over

**Flow example:**
1. Show QR code → wait for people to join
2. Click "Question 1" → people type words → word cloud grows
3. Click "Question 2" → repeat
4. Click "Round 1" in Emoji section → people guess
5. Click "Reveal Answer" → show correct answer
6. Repeat for rounds 2-4

## Local Development

```bash
npm install
npm start
```

Then open:
- Display: http://localhost:3000/display.html
- Controller: http://localhost:3000/controller.html
- Player: http://localhost:3000/player.html

## Tech Stack

- **Backend:** Node.js + Express + Socket.io
- **Frontend:** Vanilla HTML/CSS/JavaScript
- **Word Cloud:** WordCloud2.js
- **QR Codes:** node-qrcode
- **Real-time:** WebSockets via Socket.io

## Files

- `server.js` - Backend server handling real-time connections
- `public/display.html` - Projector view
- `public/controller.html` - Game controller interface
- `public/player.html` - Audience participation view
- `package.json` - Dependencies
- `vercel.json` - Vercel deployment config
