# 🎮 GameZone - Professional HTML5 Gaming Platform

A fully working, premium HTML5 gaming platform built with Next.js 16, Firebase, and 14+ self-hosted games.

## ✨ Features

### 🎯 Core Features
- **14+ Self-Hosted Games** - All games run locally, no external iframes
- **Endless Runner Game** - Custom-built Neon Runner (Subway Surfers style)
- **Firebase Authentication** - Email/password login & signup
- **Personal Score System** - Save and track high scores in Firestore
- **PWA Support** - Installable as a mobile app
- **Fullscreen Gaming** - Immersive full-screen game mode
- **Responsive Design** - Works perfectly on mobile & desktop

### 🎨 UI/UX
- **Premium Modern Design** - Gradient backgrounds, smooth animations
- **Loading Screens** - Professional loading indicators
- **Hover Effects** - Interactive game cards
- **SVG Thumbnails** - All game images load instantly
- **Dark Theme** - Eye-friendly gaming experience

### 📱 PWA Features
- **Install Button** - Add to home screen
- **Service Worker** - Offline support
- **App-Like Experience** - Opens like native app
- **Mobile Optimized** - Perfect for phones

### 🔒 Authentication
- **Sign Up/Login** - Firebase Auth
- **User Sessions** - Persistent login
- **Personal Profiles** - User data in Firestore
- **Score Tracking** - Individual high scores

### 📊 Games Included

#### Action Games
1. **Neon Runner** 🏃 - Endless runner with coins & obstacles (CUSTOM BUILT)
2. **Flappy Bird** 🐦 - Tap to fly through pipes
3. **Space Invaders** 👾 - Classic alien shooter

#### Puzzle Games
4. **2048** 🔢 - Number merging puzzle
5. **Tetris** 🧱 - Block stacking classic
6. **Minesweeper** 💣 - Logic mine sweeper
7. **Simon Says** 🎵 - Memory sequence game
8. **Memory Cards** 🃏 - Emoji matching game

#### Arcade Games
9. **Snake** 🐍 - Classic snake game
10. **Breakout** 🧱 - Brick breaker

#### Racing Games
11. **Car Racing** 🏎️ - Endless traffic dodger

#### Sports Games
12. **Ping Pong** 🏓 - vs AI table tennis

#### Casual Games
13. **Whack-a-Mole** 🔨 - Quick reflex game
14. **Color Match** 🎨 - Brain teaser

## 📁 Project Structure

```
game-platform/
├── public/
│   ├── games/              # All HTML5 games
│   │   ├── neon-runner/    # Custom endless runner
│   │   ├── 2048/
│   │   ├── snake/
│   │   ├── tetris/
│   │   └── ... (14 games total)
│   ├── images/games/       # SVG game thumbnails
│   ├── icons/              # PWA icons
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service worker
├── src/
│   ├── app/                # Next.js pages
│   │   ├── page.tsx        # Homepage
│   │   ├── game/[id]/      # Game pages
│   │   ├── search/         # Search page
│   │   └── category/       # Category pages
│   ├── components/
│   │   ├── auth/           # Auth components
│   │   ├── GameCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PWAInstall.tsx
│   ├── context/
│   │   └── AuthContext.tsx # Auth state management
│   ├── data/
│   │   └── games.ts        # Game data
│   ├── lib/
│   │   └── firebase/       # Firebase services
│   │       ├── config.ts
│   │       ├── app.ts
│   │       ├── auth.ts
│   │       └── firestore.ts
│   └── types/
│       └── game.ts
└── package.json
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing one)
3. Enable **Authentication** (Email/Password)
4. Enable **Firestore Database**
5. Get your Firebase config from Project Settings
6. Update `src/lib/firebase/config.ts`:

```typescript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Set Up Firestore Rules

In Firebase Console > Firestore Database > Rules, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId}/scores/{scoreId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 🎮 Adding New Games

1. Create a folder in `public/games/GAME_NAME/`
2. Add `index.html` with your game
3. Add thumbnail in `public/images/games/GAME_NAME.png`
4. Update `src/data/games.ts`:

```typescript
{
  id: 'game-name',
  title: 'Game Name',
  description: 'Description',
  category: 'Action',
  thumbnail: '/images/games/game-name.png',
  url: '/games/game-name/index.html',
  tags: ['tag1', 'tag2'],
  featured: true,
  addedAt: '2026-01-01',
}
```

### Game Score Integration

Add this to your game's HTML to send scores to the platform:

```javascript
// On game over
window.parent.postMessage({
  type: 'gameOver',
  score: currentScore,
  highScore: highScore
}, '*');
```

## 📱 PWA Installation

The app is fully installable! Users will see an "Install App" button when visiting on supported browsers.

### Mobile Install
- **Android**: "Add to Home Screen" via Chrome menu
- **iOS**: "Add to Home Screen" via Safari share menu
- **Desktop**: Install button appears automatically

## 🔐 Authentication Features

### Sign Up
- Email & password
- Display name
- Auto-creates Firestore profile

### Sign In
- Persistent sessions
- Auto-login on return
- Secure password handling

### Score Saving
- Automatic on game over
- Per-user high scores
- Viewable in user menu

## 🎨 Customization

### Colors
Edit Tailwind classes throughout the app. Main theme:
- Primary: Purple (#764ba2)
- Secondary: Pink (#f5576c)
- Accent: Gradient (purple → pink)

### Fonts
Using Inter font. Change in `src/app/layout.tsx`.

### Game Categories
Update in `src/data/games.ts`:
- Action
- Puzzle
- Arcade
- Racing
- Sports
- Casual
- Strategy
- Adventure

## 📊 Performance Optimizations

- ✅ Lazy-loaded game iframes
- ✅ SVG thumbnails (no external requests)
- ✅ Local game files (fast loading)
- ✅ Service worker caching
- ✅ Next.js static generation
- ✅ Image optimization

## 🔍 SEO Features

- ✅ Meta tags on all pages
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ JSON-LD structured data
- ✅ Sitemap support
- ✅ Robots.txt

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Auth**: Firebase Auth
- **Database**: Firestore
- **Icons**: Lucide React
- **PWA**: Custom Service Worker

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🚨 Important Notes

### Firebase Configuration
**YOU MUST ADD YOUR FIREBASE CREDENTIALS** in `src/lib/firebase/config.ts`

### Game Development
All games are self-contained HTML files with:
- No external dependencies
- Touch support for mobile
- Score tracking via postMessage
- localStorage for local high scores

### Deployment
- **Vercel**: Push to Git, auto-deploys
- **Netlify**: Connect repo, builds automatically
- **Custom Server**: Run `npm run build && npm start`

## 🎯 Future Enhancements

- [ ] Multiplayer support
- [ ] Game comments/ratings
- [ ] Leaderboards
- [ ] Achievements system
- [ ] Social login (Google, GitHub)
- [ ] More games
- [ ] Game recommendations AI
- [ ] Tournament system

## 📄 License

MIT - Free to use for personal & commercial projects

## 🤝 Support

For issues or questions:
1. Check Firebase config is correct
2. Ensure Firestore rules are set
3. Verify all game files exist
4. Check browser console for errors

## 🎉 Enjoy Gaming!

Your professional gaming platform is ready. Add your Firebase config and start playing!
