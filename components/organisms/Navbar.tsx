import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import SearchBar from "../atom/SearchBar";

const Navbar = () => {
  return (
    <nav className="app-navbar">
      <div className="app-navbar__inner">
        <Link className="app-navbar__brand" href="/">
          <span className="app-navbar__logo" aria-hidden="true">
            <LayoutGrid />
          </span>
          <span className="app-navbar__text">
            <span className="app-navbar__title">Kanban Board</span>
            <span className="app-navbar__subtitle">10 tasks</span>
          </span>
        </Link>
        <SearchBar placeholder="Search tasks..." />
      </div>
    </nav>
  );
};

export default Navbar;
