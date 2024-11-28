// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { Brain, Plus, Settings, Home, BarChart2, Share2 } from 'lucide-react'; // Changed ChartBar to BarChart2
import { useStore } from '../store/useStore';
import { Button } from './ui/Button';

export default function Navbar() {
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl">FlashGenius</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/study">
              <Button variant="ghost" size="sm">
                <Brain className="w-4 h-4 mr-2" />
                Study
              </Button>
            </Link>
            <Link to="/create">
              <Button variant="default" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </Link>
            <Link to="/stats">
              <Button variant="ghost" size="sm">
                <BarChart2 className="w-4 h-4 mr-2" /> {/* Changed from ChartBar to BarChart2 */}
                Stats
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
			<Link to="/templates">
  <Button variant="ghost" size="sm">
    Templates
  </Button>
</Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

