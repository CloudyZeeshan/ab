'use client';

import { useState, useMemo } from 'react';
import GameCard from '@/components/GameCard';
import CategoryFilter from '@/components/CategoryFilter';
import { games } from '@/data/games';
import { GameCategory } from '@/types/game';
import { Zap, TrendingUp, Gamepad2 } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'All'>('All');

  // Filter games by selected category
  const filteredGames = useMemo(() => {
    if (selectedCategory === 'All') return games;
    return games.filter(game => game.category === selectedCategory);
  }, [selectedCategory]);

  // Get featured games
  const featuredGames = games.filter(game => game.featured);

  // JSON-LD structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GameZone',
    description: 'Play free HTML5 games online',
    url: 'https://gamezone.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://gamezone.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    hasPart: games.map(game => ({
      '@type': 'VideoGame',
      name: game.title,
      description: game.description,
      gamePlatform: 'Web Browser',
      genre: game.category
    }))
  };

  return (
    <div className="min-h-screen">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-950 to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full mb-6">
              <Gamepad2 className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 text-sm font-semibold">Free HTML5 Games</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Play Instantly
              </span>
              <br />
              <span className="text-white">No Downloads Required</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Enjoy hundreds of free HTML5 games on any device. Jump in and start playing immediately!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Instant Play</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span>New Games Weekly</span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-purple-400" />
                <span>{games.length}+ Games</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      {featuredGames.length > 0 && (
        <section id="featured" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Featured Games</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Games Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">All Games</h2>
            
            {/* Category Filter */}
            <div id="categories" className="mt-8">
              <CategoryFilter onCategoryChange={setSelectedCategory} />
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {/* No Results Message */}
          {filteredGames.length === 0 && (
            <div className="text-center py-16">
              <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No games found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 md:p-12 border border-purple-800">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Play?
            </h2>
            <p className="text-gray-300 mb-6">
              Choose a game and start playing instantly. No downloads, no installations!
            </p>
            <a 
              href="#featured"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Browse Games
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
