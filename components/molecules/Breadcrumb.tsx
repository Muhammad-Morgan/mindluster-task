import Link from "next/link";
import { navLinks } from "../../utils/navLinks";

export const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link href="/" className="text-decoration-none">
            Home
          </Link>
        </li>
        {navLinks.map((link) => {
          return (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          );
        })}
      </ol>
    </nav>
  );
};
