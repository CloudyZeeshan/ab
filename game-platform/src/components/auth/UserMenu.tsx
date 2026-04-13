'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserScores } from '@/lib/firebase/firestore';
import { User, LogOut, Trophy, Gamepad2, ChevronDown } from 'lucide-react';

export default function UserMenu() {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [scores, setScores] = useState<any[]>([]);
  const [loadingScores, setLoadingScores] = useState(false);

  if (!user) return null;

  const handleViewScores = async () => {
    if (!user) return;
    setLoadingScores(true);
    setShowScores(true);
    try {
      const userScores = await getUserScores(user.uid);
      setScores(userScores);
    } catch (error) {
      console.error('Error loading scores:', error);
    } finally {
      setLoadingScores(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <span className="hidden sm:inline">{user.email?.split('@')[0] || 'User'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50">
            <div className="p-4 border-b border-gray-800">
              <p className="text-white font-semibold truncate">{user.email}</p>
              <p className="text-gray-400 text-sm">Player</p>
            </div>
            
            <div className="py-2">
              <button
                onClick={handleViewScores}
                className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-800 transition-colors flex items-center gap-3"
              >
                <Trophy className="w-5 h-5 text-yellow-500" />
                My Scores
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-800 transition-colors flex items-center gap-3"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scores Modal */}
      {showScores && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">My High Scores</h2>
              </div>
              <button
                onClick={() => setShowScores(false)}
                className="p-2 text-white hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {loadingScores ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                  <p className="text-gray-400 mt-4">Loading scores...</p>
                </div>
              ) : scores.length === 0 ? (
                <div className="text-center py-12">
                  <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No scores yet. Start playing!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {scores.map((score, index) => (
                    <div
                      key={score.id || index}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{score.gameTitle}</p>
                          <p className="text-gray-400 text-sm">
                            {score.playedAt?.toDate ? 
                              score.playedAt.toDate().toLocaleDateString() : 
                              'Recently'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          {score.highScore.toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-xs">High Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
