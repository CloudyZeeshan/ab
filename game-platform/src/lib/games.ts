// Utility functions for games
import { Game, GameCategory } from '@/types/game';
import { games } from '@/data/games';

export function getGameById(id: string): Game | undefined {
  return games.find(game => game.id === id);
}

export function getGamesByCategory(category: GameCategory | 'All'): Game[] {
  if (category === 'All') return games;
  return games.filter(game => game.category === category);
}

export function getFeaturedGames(): Game[] {
  return games.filter(game => game.featured);
}

export function searchGames(query: string): Game[] {
  const lowerQuery = query.toLowerCase();
  return games.filter(game => 
    game.title.toLowerCase().includes(lowerQuery) ||
    game.description.toLowerCase().includes(lowerQuery) ||
    game.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    game.category.toLowerCase().includes(lowerQuery)
  );
}

export function getAllCategories(): string[] {
  return ['All', ...new Set(games.map(game => game.category))];
}
