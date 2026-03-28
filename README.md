# 🐣 Easter Play - Interactive Game

Word Cloud & Emoji Guessing Game with real-time audience participation

## Features

### 1. Word Cloud Game
- Question 1: "Say one word you think of when you hear 'God.'"
- Question 2: "Say one word for love."
- Question 3: "Say one word for the best gift ever."
- Question 4: "Say one word for how you're feeling today."
- Question 5: "Say one word for something that makes you smile."
- Live word cloud updates as audience submits words

### 2. Emoji Guessing Game (John 3:16)
Five rounds revealing: "For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish, but have eternal life."

- Round 1: ❤️ = LOVE
- Round 2: 🌍 = WORLD
- Round 3: 🎁 = GAVE
- Round 4: 👦 = SON
- Round 5: 🌱 = LIFE

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

1. **Show QR code** → wait for people to join
2. **Click "Question 1" (God)** → people type words → word cloud grows
3. **Click "Question 2" (Love)** → repeat
4. **Click "Question 3" (Best gift)** → repeat
5. **Click "Question 4" (Feeling today)** → repeat
6. **Click "Question 5" (Makes you smile)** → repeat
7. **Click "Round 1"** (❤️ LOVE) → people guess → Reveal Answer
8. **Click "Round 2"** (🌍 WORLD) → people guess → Reveal Answer
9. **Click "Round 3"** (🎁 GAVE) → people guess → Reveal Answer
10. **Click "Round 4"** (👦 SON) → people guess → Reveal Answer
11. **Click "Round 5"** (🌱 LIFE) → people guess → Reveal Answer
12. **Click "Reveal Word by Word"** → Shows John 3:16 one word at a time with key words highlighted in gold
13. **Or "Show Full Verse"** → Shows complete verse instantly

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
