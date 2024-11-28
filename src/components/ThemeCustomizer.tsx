// src/components/ThemeCustomizer.tsx
import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from './ui/Button';

export default function ThemeCustomizer() {
const { setTheme, theme } = useStore((state) => ({
  setTheme: state.setTheme,
  theme: state.theme,
}));

const [customColors, setCustomColors] = useState({
  primary: '#000000',
  secondary: '#ffffff',
  accent: '#3b82f6',
});

const handleColorChange = (colorKey: keyof typeof customColors) => (e: React.ChangeEvent<HTMLInputElement>) => {
  setCustomColors((prev) => ({
    ...prev,
    [colorKey]: e.target.value,
  }));
};

return (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Customize Theme</h1>

    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => setTheme('light')}
          variant={theme === 'light' ? 'default' : 'outline'}
        >
          Light
        </Button>
        <Button
          onClick={() => setTheme('dark')}
          variant={theme === 'dark' ? 'default' : 'outline'}
        >
          Dark
        </Button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Primary Color
          <input
            type="color"
            value={customColors.primary}
            onChange={handleColorChange('primary')}
            className="ml-2"
          />
        </label>

        <label className="block text-sm font-medium">
          Secondary Color
          <input
            type="color"
            value={customColors.secondary}
            onChange={handleColorChange('secondary')}
            className="ml-2"
          />
        </label>

        <label className="block text-sm font-medium">
          Accent Color
          <input
            type="color"
            value={customColors.accent}
            onChange={handleColorChange('accent')}
            className="ml-2"
          />
        </label>
      </div>
    </div>
  </div>
);
}