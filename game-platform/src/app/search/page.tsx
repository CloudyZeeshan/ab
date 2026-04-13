'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import GameCard from '@/components/GameCard';
import { searchGames } from '@/lib/games';
import { Search, Gamepad2 } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query) return [];
    return searchGames(query);
  }, [query]);

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Search Results
            </h1>
          </div>
          <p className="text-gray-400">
            {results.length} {results.length === 1 ? 'game' : 'games'} found for "{query}"
          </p>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              No games found
            </h2>
            <p className="text-gray-400 mb-6">
              Try searching with different keywords or browse our categories.
            </p>
            <a 
              href="/"
              className="inline-block px-6 py-3 bg-purple-500 text-white font-semibold rounded-full hover:bg-purple-600 transition-colors"
            >
              Browse All Games
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Searching games..." />}>
      <SearchResults />
    </Suspense>
  );
}
