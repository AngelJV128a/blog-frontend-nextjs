import Link from "next/link";

export default function Card({ title, user, id }) {
  return (
    <div
      key={id}
      className="flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl p-6"
    >
      <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">{title}</h5>
      <p className="text-base font-light leading-relaxed text-inherit mb-4">
        Autor: {user}
      </p>
      <Link href={`/Posts/${id}`}>
        <button
          className="mt-auto text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg transition"
          type="button"
        >
          Read More
        </button>
      </Link>
    </div>
  );
}
