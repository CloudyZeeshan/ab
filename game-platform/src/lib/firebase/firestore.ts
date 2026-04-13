import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './app';

export interface Score {
  id?: string;
  gameId: string;
  gameTitle: string;
  score: number;
  highScore: number;
  playedAt: any;
}

// Save or update user score
export const saveScore = async (userId: string, score: Score) => {
  try {
    const scoreRef = doc(db, 'users', userId, 'scores', score.gameId);
    const scoreDoc = await getDoc(scoreRef);
    
    if (scoreDoc.exists()) {
      // Update if new high score is better
      const existingScore = scoreDoc.data();
      if (score.highScore > existingScore.highScore) {
        await updateDoc(scoreRef, {
          highScore: score.highScore,
          lastScore: score.score,
          playedAt: serverTimestamp()
        });
      } else {
        // Just update last played
        await updateDoc(scoreRef, {
          lastScore: score.score,
          playedAt: serverTimestamp()
        });
      }
    } else {
      // Create new score document
      await setDoc(scoreRef, {
        gameId: score.gameId,
        gameTitle: score.gameTitle,
        highScore: score.highScore,
        lastScore: score.score,
        playedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};

// Get all scores for a user
export const getUserScores = async (userId: string): Promise<Score[]> => {
  try {
    const scoresRef = collection(db, 'users', userId, 'scores');
    const q = query(scoresRef, orderBy('playedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Score));
  } catch (error) {
    console.error('Error getting scores:', error);
    return [];
  }
};

// Get single game high score for user
export const getGameHighScore = async (userId: string, gameId: string): Promise<number> => {
  try {
    const scoreRef = doc(db, 'users', userId, 'scores', gameId);
    const scoreDoc = await getDoc(scoreRef);
    
    if (scoreDoc.exists()) {
      return scoreDoc.data().highScore;
    }
    return 0;
  } catch (error) {
    console.error('Error getting high score:', error);
    return 0;
  }
};

// Get user profile
export const getUserProfile = async (userId: string): Promise<DocumentData | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
};

// Create or update user profile
export const updateUserProfile = async (userId: string, profile: DocumentData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profile,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
