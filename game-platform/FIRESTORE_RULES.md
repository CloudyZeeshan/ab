# Firestore Rules Setup Guide

## How to Apply These Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click "Firestore Database" in the left menu
4. Click the "Rules" tab
5. Copy and paste the rules below
6. Click "Publish"

## Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the resource
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection - user profiles
    match /users/{userId} {
      // Users can read their own profile
      allow read: if isOwner(userId);
      
      // Users can create their profile during signup
      allow create: if isAuthenticated() && request.auth.uid == userId;
      
      // Users can update their own profile
      allow update: if isOwner(userId);
      
      // Users cannot delete profiles (safety)
      allow delete: if false;
    }
    
    // Scores subcollection - user scores
    match /users/{userId}/scores/{scoreId} {
      // Users can read their own scores
      allow read: if isOwner(userId);
      
      // Users can create scores (auto-created on first game)
      allow create: if isOwner(userId);
      
      // Users can update their own scores (for new high scores)
      allow update: if isOwner(userId);
      
      // Users cannot delete scores (keep history)
      allow delete: if false;
    }
    
    // Prevent access to other users' data
    match /users/{userId}/{document=**} {
      allow read, write: if isOwner(userId);
    }
  }
}
```

## What These Rules Do

✅ **Secure by Default** - Users can only access their own data
✅ **Score Protection** - Only score owners can modify
✅ **Profile Safety** - Users manage only their profiles
✅ **No Deletion** - Prevents accidental data loss
✅ **Auth Required** - All operations require authentication

## Testing

After applying rules:

1. Create a new account in your app
2. Play a game
3. Check Firestore Console - you should see:
   - A user document in `users` collection
   - A score document in `users/{uid}/scores/{gameId}`

## Troubleshooting

**Permission Denied Error?**
- Check if user is logged in
- Verify rules are published
- Check browser console for error details

**Scores Not Saving?**
- Verify Firestore is enabled
- Check rules match exactly
- Ensure Firebase config is correct
