"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../../utils/navLinks";

export const Breadcrumb = () => {
  const pathname = usePathname();

  return (
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
          const Icon = link.icon;

          return (
            <li
              key={link.href}
              className={`breadcrumb-item ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive ? (
                <span className="d-flex align-items-center gap-2 text-primary">
                  <Icon size={16} />
                  {link.label}
                </span>
              ) : (
                <Link href={link.href} className="text-decoration-none">
                  <span className="d-flex align-items-center gap-2">
                    <Icon size={16} />
                    {link.label}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
