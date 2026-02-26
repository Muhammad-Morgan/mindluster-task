"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import SearchBar from "../atom/SearchBar";

const Navbar = () => {
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const resp = await fetch("/api/tasks/gettasks");
      if (!resp.ok) return { tasks: [] };
      return resp.json();
    },
  });

  const tasksCount = Array.isArray((data as { tasks?: unknown[] })?.tasks)
    ? (data as { tasks: unknown[] }).tasks.length
    : Array.isArray(data)
      ? data.length
      : 0;

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
              <span className="text-body-secondary fs-6">
                {tasksCount} tasks
              </span>
            </span>
          </Link>

          <Suspense
            fallback={
              <div
                className="w-100"
                style={{ maxWidth: "220px", height: "31px" }}
              />
            }
          >
            <SearchBar />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
