import { Link } from "react-router-dom";

export function BookingBar() {
  return (
    <div className="mx-auto -mt-16 max-w-6xl px-6 relative z-20">
      <div className="grid bg-white p-4 shadow-2xl md:grid-cols-4 md:p-5">
        <div className="border-b border-stone-200 p-4 md:border-b-0 md:border-r">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-400">
            Check in
          </label>

          <input
            type="date"
            className="mt-2 w-full border-0 bg-transparent p-0 text-sm text-stone-800 outline-none"
          />
        </div>

        <div className="border-b border-stone-200 p-4 md:border-b-0 md:border-r">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-400">
            Check out
          </label>

          <input
            type="date"
            className="mt-2 w-full border-0 bg-transparent p-0 text-sm text-stone-800 outline-none"
          />
        </div>

        <div className="border-b border-stone-200 p-4 md:border-b-0 md:border-r">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-400">
            Guests
          </label>

          <select className="mt-2 w-full border-0 bg-transparent p-0 text-sm text-stone-800 outline-none">
            <option>2 Adults</option>
            <option>1 Adult</option>
            <option>3 Adults</option>
            <option>4 Adults</option>
          </select>
        </div>

        <div className="p-4">
          <Link
            to="/contact"
            className="flex h-full min-h-12 items-center justify-center bg-stone-900 px-6 text-sm text-white transition hover:bg-stone-700"
          >
            Check availability
          </Link>
        </div>
      </div>
    </div>
  );
}