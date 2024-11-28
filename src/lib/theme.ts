// lib/theme.ts
export const themes = {
default: {
  primary: 'blue',
  secondary: 'purple',
  accent: 'pink',
},
forest: {
  primary: 'green',
  secondary: 'brown',
  accent: 'yellow',
},
ocean: {
  primary: 'blue',
  secondary: 'teal',
  accent: 'coral',
},
};

// components/ThemeCustomizer.tsx
export function ThemeCustomizer() {
const [selectedTheme, setSelectedTheme] = useState('default');
const [customColors, setCustomColors] = useState({});

return (
  <div className="space-y-4">
    <ThemeSelector
      themes={themes}
      selected={selectedTheme}
      onChange={setSelectedTheme}
    />
    <ColorPicker
      colors={customColors}
      onChange={setCustomColors}
    />
    <AnimationSettings />
  </div>
);
}