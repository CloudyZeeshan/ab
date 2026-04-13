'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getGameById, getGamesByCategory } from '@/lib/games';
import GameCard from '@/components/GameCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { saveScore } from '@/lib/firebase/firestore';
import { ArrowLeft, Share2, Maximize2, Gamepad2, Tag, Trophy, Info } from 'lucide-react';

export default function GamePage() {
  const params = useParams();
  const gameId = params?.id as string;
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [game, setGame] = useState<any>(null);
  const [relatedGames, setRelatedGames] = useState<any[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setIsGameLoaded(false);

    const foundGame = getGameById(gameId);

    if (!foundGame) {
      notFound();
      return;
    }

    setGame(foundGame);

    const related = getGamesByCategory(foundGame.category)
      .filter(g => g.id !== foundGame.id)
      .slice(0, 4);
    setRelatedGames(related);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [gameId]);

  // Listen for game over messages from iframe
  const handleGameMessage = useCallback((event: MessageEvent) => {
    if (event.data && event.data.type === 'gameOver') {
      const { score, highScore: newHighScore } = event.data;
      setCurrentScore(score);
      setHighScore(newHighScore);
      
      // Save to Firestore if user is logged in
      if (user && game) {
        saveScore(user.uid, {
          gameId: game.id,
          gameTitle: game.title,
          score,
          highScore: newHighScore,
          playedAt: new Date()
        }).catch(err => console.error('Error saving score:', err));
      }
    }
  }, [user, game]);

  useEffect(() => {
    window.addEventListener('message', handleGameMessage);
    return () => window.removeEventListener('message', handleGameMessage);
  }, [handleGameMessage]);

  const handleShare = () => {
    if (navigator.share && game) {
      navigator.share({
        title: game.title,
        text: game.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (!iframe) return;

    if (!document.fullscreenElement) {
      iframe.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading game..." />
      </div>
    );
  }

  if (!game) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Games</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Game Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Game Title & Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {game.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                  {game.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-800 text-gray-400 rounded-full text-xs"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Score Display */}
            {highScore > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-xs text-gray-400">High Score</p>
                  <p className="text-xl font-bold text-yellow-500">{highScore.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
          <p className="text-gray-400">{game.description}</p>
        </div>

        {/* Game Frame */}
        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 group">
          {/* Loading Overlay */}
          {!isGameLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <LoadingSpinner size="lg" text="Loading game..." />
            </div>
          )}
          
          {/* Game Controls Overlay */}
          {showControls && isGameLoaded && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-black/70 backdrop-blur-sm rounded-lg text-white hover:bg-black/90 transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <iframe
            id="game-iframe"
            src={game.url}
            className="w-full"
            style={{ height: '70vh', minHeight: '600px' }}
            allowFullScreen
            onLoad={() => setIsGameLoaded(true)}
            title={game.title}
            allow="autoplay; fullscreen; microphone; gamepad"
          />
        </div>

        {/* Game Controls Info */}
        <div className="mt-4 p-4 bg-gradient-to-r from-gray-800/70 to-gray-900/70 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3 text-gray-300 text-sm">
            <Info className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <span>Use mouse or arrow keys to play. Click the game to focus. Press ESC to exit fullscreen.</span>
            {!user && (
              <span className="ml-auto text-yellow-400 font-semibold">
                Sign in to save your scores!
              </span>
            )}
          </div>
        </div>

        {/* Related Games */}
        {relatedGames.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedGames.map((relatedGame) => (
                <GameCard key={relatedGame.id} game={relatedGame} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
