// hooks/use-theme.ts
import { create } from 'zustand'

interface ThemeStore {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useTheme = create<ThemeStore>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}))

// hooks/use-toast.ts
// Implement toast functionality using @radix-ui/react-toast