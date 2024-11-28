import { useState } from 'react'
import { useStore } from '../store/useStore'
import { Button } from '../components/ui/Button'
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Puzzle,
  HelpCircle,
  Menu,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Settings() {
  const theme = useStore((state) => state.theme)
  const setTheme = useStore((state) => state.setTheme)
  const [activeSection, setActiveSection] = useState('profile')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { id: 'profile', name: 'Profile Settings', icon: User },
    { id: 'account', name: 'Account Settings', icon: SettingsIcon },
    { id: 'notifications', name: 'Notification Preferences', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'appearance', name: 'Theme/Appearance', icon: Palette },
    { id: 'integrations', name: 'Integrations', icon: Puzzle },
    { id: 'help', name: 'Help & Support', icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4">
        <Button
          variant="outline"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full justify-between"
        >
          <span>Menu</span>
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="container mx-auto py-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <AnimatePresence>
            {(isMobileMenuOpen || !isMobileMenuOpen) && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className={`lg:col-span-3 ${
                  isMobileMenuOpen ? 'block' : 'hidden lg:block'
                }`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                  <nav className="space-y-1">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Button
                          key={item.id}
                          variant={activeSection === item.id ? 'secondary' : 'ghost'}
                          className="w-full justify-start"
                          onClick={() => {
                            setActiveSection(item.id)
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <Icon className="mr-3 h-4 w-4" />
                          <span>{item.name}</span>
                        </Button>
                      )
                    })}
                  </nav>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
              {activeSection === 'appearance' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Theme Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Theme</span>
                      <Button
                        variant="outline"
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                      >
                        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Data Management</span>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (confirm('Are you sure you want to clear all data?')) {
                            localStorage.clear()
                            window.location.reload()
                          }
                        }}
                      >
                        Clear All Data
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add other sections here */}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}