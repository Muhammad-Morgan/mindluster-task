"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, Menu, X } from "lucide-react";
import SearchBar from "../atom/SearchBar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar bg-body-tertiary border-bottom">
      <div className="container d-flex flex-column py-2">
        <div className="d-flex align-items-center justify-content-between w-100 gap-3">
          <Link
            className="navbar-brand d-flex align-items-center gap-3 mb-0 text-decoration-none"
            href="/"
          >
            <span
              className="icon-link justify-content-center rounded-3 bg-primary text-white shadow-sm"
              style={{ width: "38px", height: "38px" }}
              aria-hidden="true"
            >
              <LayoutGrid className="bi fs-3" />
            </span>
            <span className="d-flex flex-column lh-sm">
              <span className="text-uppercase fs-5 fw-semibold">
                Kanban Board
              </span>
              <span className="text-body-secondary fs-6">10 tasks</span>
            </span>
          </Link>

          <SearchBar />

          <button
            className="d-md-none btn btn-link p-0 text-body-secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="d-md-none mt-3">
            <SearchBar />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
