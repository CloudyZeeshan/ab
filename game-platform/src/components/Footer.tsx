import Link from 'next/link';
import { Gamepad2, Globe, Send } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                GameZone
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Your ultimate destination for free HTML5 games. Play instantly, no downloads required!
            </p>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#featured" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Featured Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/puzzle" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Puzzle Games
                </Link>
              </li>
              <li>
                <Link href="/category/action" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Action Games
                </Link>
              </li>
              <li>
                <Link href="/category/arcade" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Arcade Games
                </Link>
              </li>
              <li>
                <Link href="/category/racing" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Racing Games
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {currentYear} GameZone. All rights reserved. Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
