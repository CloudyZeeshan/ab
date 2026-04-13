import Link from 'next/link';
import { Gamepad2, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Gamepad2 className="w-24 h-24 text-purple-500 mx-auto mb-4" />
          <h1 className="text-8xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl font-bold text-white mb-2">
            Game Not Found
          </h2>
          <p className="text-gray-400">
            Oops! The game you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <Link 
            href="/#categories"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition-all"
          >
            <Search className="w-5 h-5" />
            <span>Browse Games</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
