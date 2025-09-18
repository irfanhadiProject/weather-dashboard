import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full items-center gap-6">
      <div className="flex flex-col w-full items-center">
        <header className="flex justify-between items-center w-11/12 max-w-[1024px] p-4 text-[var(--accent)] ">
          <Link to="/">
            <span className="text-lg font-extrabold md:text-3xl">Weather</span>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex text-base font-semibold gap-6 md:text-lg">
              <li>
                <Link to="/" className="hover:text-[var(--accent-hover)]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="hover:text-[var(--accent-hover)]"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex gap-2 items-center">
            <span className="font-mono text-xs md:text-base px-2 py-1 bg-[var(--surface)] text-[var(--accent)] rounded-lg shadow">
              {time.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </span>

            <Button
              variant="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            <ThemeToggle />
          </div>
        </header>

        {isOpen && (
          <nav className="md:hidden">
            <ul className="flex flex-col gap-4 items-center text-base font-semibold md:text-lg text-[var(--accent)]">
              <li>
                <Link
                  to="/"
                  className="hover:text-[var(--accent-hover)]"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="hover:text-[var(--accent-hover)]"
                  onClick={() => setIsOpen(false)}
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="text-xs place-items-center p-3 md:text-sm">
        <p>© 2025 Irfan Hadi</p>
      </footer>
    </div>
  );
}

export default AppLayout;
