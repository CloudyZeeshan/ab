// Game type definitions
export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  thumbnail: string;
  url: string; // URL to embed or local path
  tags: string[];
  featured?: boolean;
  addedAt: string;
}

export type GameCategory = 
  | 'Action'
  | 'Puzzle'
  | 'Arcade'
  | 'Racing'
  | 'Sports'
  | 'Strategy'
  | 'Adventure'
  | 'Casual';

export interface Category {
  name: GameCategory;
  icon: string;
  color: string;
}
