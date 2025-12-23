import { Link } from "react-router-dom";
import { navLinks } from "../utils";

const Header = () => {
  return (
    <header className="mb-10 body-container">
      <nav className="flex justify-center py-10 pointer-events-auto">
        <ul className="flex px-3 text-sm font-medium rounded-full shadow-lg bg-white/90 text-zinc-800 shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                to={link.link}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
