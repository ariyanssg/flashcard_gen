// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white text-gray-900 shadow-md z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">FlashGenius</span>
            </Link>
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/create" className="hover:text-blue-600">Create Flashcards</Link>
            <Link to="/study" className="hover:text-blue-600">My Flashcards</Link>
            <Link to="/templates" className="hover:text-blue-600">Templates</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
          <Link to="/create">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-24 pb-16 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Effortlessly Create Flashcards for Smarter Learning
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          AI-powered flashcard generation to make studying easier and more effective.
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/create">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Get Started
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800">
              Learn More
            </button>
          </Link>
        </motion.div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white text-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full inline-block mb-4">
                <i className="fas fa-brain text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Flashcards</h3>
              <p>Generate flashcards instantly from text or images using advanced AI.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-full inline-block mb-4">
                <i className="fas fa-paint-brush text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable Templates</h3>
              <p>Personalize your flashcards with themes and templates.</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 text-pink-600 p-4 rounded-full inline-block mb-4">
                <i className="fas fa-chart-line text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Modes</h3>
              <p>Track your progress and study smarter with analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 FlashGenius. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}