# 🚀 Quick Start Guide - GameZone

## Step 1: Add Firebase Credentials (REQUIRED)

Your app won't work without Firebase credentials. Here's how to add them:

### Option A: Update Config File (Quick)

Edit `src/lib/firebase/config.ts`:

```typescript
export const firebaseConfig = {
  apiKey: "AIza...",                    // Your API key
  authDomain: "myapp.firebaseapp.com", // Your auth domain
  projectId: "myapp",                  // Your project ID
  storageBucket: "myapp.appspot.com",  // Storage bucket
  messagingSenderId: "123456789",     // Sender ID
  appId: "1:123456789:web:abcdef"     // App ID
};
```

### Option B: Use Environment Variables (Recommended for Production)

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase credentials in `.env.local`

3. Update `src/lib/firebase/config.ts` to use env vars:
   ```typescript
   export const firebaseConfig = {
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
   };
   ```

## Step 2: Set Up Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add Project"
3. Follow the wizard (enable Google Analytics if you want)
4. Once created, click the gear icon ⚙️ > "Project settings"
5. Scroll down to "Your apps" section
6. Click the web icon `</>` to add a web app
7. Register your app with a nickname (e.g., "gamezone-web")
8. Copy the config object

## Step 3: Enable Authentication

1. In Firebase Console, click "Authentication" in left menu
2. Click "Get started"
3. Click "Email/Password" provider
4. Toggle "Enable" and save

## Step 4: Enable Firestore

1. In Firebase Console, click "Firestore Database" in left menu
2. Click "Create database"
3. Choose "Start in **test mode**" (for development)
4. Select a location close to you
5. Click "Enable"

**IMPORTANT**: Test mode allows all reads/writes for 30 days. For production, use the rules in `FIRESTORE_RULES.md`.

## Step 5: Install & Run

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Open http://localhost:3000

## Step 6: Test Everything

### ✅ Checklist

- [ ] Homepage loads with all game cards
- [ ] All 14 game thumbnails show
- [ ] Click a game - it loads in iframe
- [ ] Game is playable
- [ ] Sign up button works
- [ ] Create account successfully
- [ ] Play a game and see score saved
- [ ] View scores in user menu
- [ ] Logout works
- [ ] Login with existing account works
- [ ] Fullscreen button works
- [ ] Install app button appears (on mobile/HTTPS)

## Step 7: Deploy to Production

### Vercel (Easiest)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel settings
5. Deploy!

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### Games Don't Load
- Check browser console for errors
- Verify game files exist in `public/games/`
- Check file paths in `src/data/games.ts`

### Images Don't Show
- Verify SVG files exist in `public/images/games/`
- Check paths match exactly in `src/data/games.ts`
- SVG files should have `.png` extension (they're actually SVG)

### Auth Doesn't Work
- Verify Firebase config is correct
- Check Authentication is enabled in Firebase
- Verify email/password provider is enabled
- Check browser console for Firebase errors

### Scores Don't Save
- Verify Firestore is enabled
- Check Firestore rules (see `FIRESTORE_RULES.md`)
- Verify user is logged in
- Check browser console for permission errors

### PWA Doesn't Work
- PWA only works on HTTPS (or localhost for development)
- Check `manifest.json` exists in `public/`
- Check `sw.js` exists in `public/`
- Service worker only registers on HTTPS/localhost

## 📞 Need Help?

1. Check browser console (F12)
2. Check Firebase console for errors
3. Verify all files are in place
4. Re-read this guide

## 🎉 Success!

If everything works, you now have:
- ✅ Professional gaming platform
- ✅ 14 fully working games
- ✅ User authentication
- ✅ Score tracking system
- ✅ Installable PWA
- ✅ Mobile-responsive design

**Time to share with the world!**
