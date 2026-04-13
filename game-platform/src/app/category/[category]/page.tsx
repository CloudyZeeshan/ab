'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import GameCard from '@/components/GameCard';
import { getGamesByCategory } from '@/lib/games';
import { categories } from '@/data/games';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const categoryParam = params?.category as string;
  const category = decodeURIComponent(categoryParam);

  const games = useMemo(() => {
    return getGamesByCategory(category as any);
  }, [category]);

  const categoryInfo = categories.find(c => c.name.toLowerCase() === category.toLowerCase());

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/#categories"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Categories</span>
          </Link>
          <div className="flex items-center gap-3">
            {categoryInfo && (
              <div className={`p-3 ${categoryInfo.color} rounded-lg`}>
                <span className="text-2xl">{categoryInfo.icon}</span>
              </div>
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {category} Games
              </h1>
              <p className="text-gray-400 mt-1">
                {games.length} {games.length === 1 ? 'game' : 'games'} available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              No games available in this category yet.
            </h2>
            <p className="text-gray-400">
              Check back soon for new games!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
