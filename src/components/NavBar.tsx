import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navigation } from "../data";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute left-0 top-0 z-50 w-full text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-24 items-center justify-between border-b border-white/20">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-2xl font-medium tracking-[0.2em]"
          >
            AURELIA
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition ${
                    isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="hidden rounded-full border border-white/50 px-6 py-3 text-sm transition hover:bg-white hover:text-stone-900 lg:block"
          >
            Reserve a stay
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-px w-6 bg-white transition ${
                open ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-white transition ${
                open ? "-rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute left-0 top-24 w-full border-b border-white/10 bg-stone-950 px-6 py-8 lg:hidden">
          <nav className="flex flex-col gap-6">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="text-lg text-white/80 hover:text-white"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}