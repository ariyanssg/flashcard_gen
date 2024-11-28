import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Study from './pages/Study';
import Create from './pages/Create';
import Settings from './pages/Settings';
import StudyStats from './components/StudyStats';
import SharedDeck from './pages/SharedDeck';
import ThemeCustomizer from './components/ThemeCustomizer'; // Make sure this path is correct
import Templates from './pages/Templates'; // Import the Templates page

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  const theme = useStore((state) => state.theme);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={theme}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Router>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/study" element={<Study />} />
                <Route path="/create" element={<Create />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/stats" element={<StudyStats />} />
                <Route path="/deck/:deckId" element={<SharedDeck />} />
                <Route path="/customize" element={<ThemeCustomizer />} />
                <Route path="/templates" element={<Templates />} /> {/* Added Templates route */}
              </Routes>
            </main>
          </Router>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;