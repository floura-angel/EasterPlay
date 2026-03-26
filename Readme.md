# 🐣 Easter Play - Interactive Game

Word Cloud & Emoji Guessing Game with real-time audience participation

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

## 🚀 Deploy to Render (FREE - 3 minutes)

1. **Push code to GitHub** (your personal account)

2. **Go to [Render.com](https://render.com)**
   - Sign up with GitHub (free)

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `floura-angel/EasterPlay`
   - Click "Connect"

4. **Configure (use these exact settings):**
   - **Name**: `easter-play`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: `Free`

5. **Click "Create Web Service"**
   - Wait 2-3 minutes for deployment
   - You'll get a URL like: `https://easter-play.onrender.com`

## 🎮 How to Use

Once deployed, open these URLs:

1. **Display** (projector): `https://easter-play.onrender.com/display.html`
2. **Controller** (you): `https://easter-play.onrender.com/controller.html`
3. **Player** (audience): Scans QR code shown on display

### Game Flow:

1. Show QR code → wait for people to join
2. Click "Question 1" → people type words → word cloud grows
3. Click "Question 2" → repeat
4. Click "Round 1" in Emoji section → people guess
5. Click "Reveal Answer" → show correct answer
6. Repeat for rounds 2-4

## ⚠️ Important: Wake Up Before Event

Render free tier sleeps after 15 minutes of inactivity.

**Before your event:** Open the URL 5 minutes early so it wakes up (takes 30-60 seconds first time).

## 🧪 Local Testing

```bash
npm install
node server.js
```

Then open:
- http://localhost:3000/display.html
- http://localhost:3000/controller.html
- http://localhost:3000/player.html

## 📁 Files

- `server.js` - Backend server (Node.js + Socket.io)
- `public/index.html` - Landing page
- `public/display.html` - Projector view
- `public/controller.html` - Game controller
- `public/player.html` - Audience view
- `package.json` - Dependencies

## 💡 Tips

- Keep the controller open on your phone during the game
- Test everything 10 minutes before your event
- The game resets when you click "Reset Everything"
- Player count shows live on both display and controller
