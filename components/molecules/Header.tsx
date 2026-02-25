"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/utils/navLinks";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="py-2">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link href="/" className="text-decoration-none">
                Home
              </Link>
            </li>
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <li
                  key={link.href}
                  className={`breadcrumb-item ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive ? (
                    <span className="text-primary">{link.label}</span>
                  ) : (
                    <Link href={link.href} className="text-decoration-none">
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
};
