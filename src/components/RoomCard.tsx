import { Link } from "react-router-dom";
import type { Room } from "../data";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <article className="group overflow-hidden bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs text-stone-700">
          From ${room.price} / night
        </div>
      </div>

      <div className="p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl text-stone-900">
            {room.name}
          </h3>

          <span className="text-xs text-stone-400">
            {room.size}
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-stone-600">
          {room.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {room.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-stone-100 px-3 py-1.5 text-xs text-stone-600"
            >
              {feature}
            </span>
          ))}
        </div>

        <Link
          to="/contact"
          className="mt-7 inline-flex items-center gap-3 text-sm font-medium text-stone-900"
        >
          Reserve this room
          <span className="transition group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}