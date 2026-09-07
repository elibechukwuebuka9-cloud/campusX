import { Link } from "react-router-dom";
import { hotelInfo, navigation } from "../data";

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="text-2xl tracking-[0.2em] text-white"
            >
              AURELIA
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-stone-400">
              {hotelInfo.description}
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 text-xs transition hover:border-white hover:text-white"
              >
                IG
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 text-xs transition hover:border-white hover:text-white"
              >
                FB
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 text-xs transition hover:border-white hover:text-white"
              >
                X
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-white">
              Explore
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-stone-400 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-white">
              Contact
            </h3>

            <div className="mt-6 space-y-4 text-sm leading-6 text-stone-400">
              <p>{hotelInfo.address}</p>
              <p>{hotelInfo.phone}</p>
              <p>{hotelInfo.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-stone-800 pt-8 text-xs text-stone-500 md:flex-row">
          <p>© 2026 Aurelia House. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}