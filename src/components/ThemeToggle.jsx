import { Moon, Sun } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import Button from './Button';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useTheme();

  return (
    <Button onClick={() => setDarkMode(!darkMode)} variant="icon">
      {darkMode ? <Sun /> : <Moon />}
    </Button>
  );
}

export default ThemeToggle;
