"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DropdownPerfil from "@/components/auth/DropdownPerfil";
import { useAuthStore } from "@/stores/authStore";

export default function Navbar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <div className="flex flex-wrap place-items-center">
        <section className="relative mx-auto">
          <nav className="flex justify-between bg-gray-900 text-white w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <a className="text-3xl font-bold font-heading" href="#">
                Blog Angel
              </a>

              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <Link
                    className={`hover:text-gray-200 ${
                      pathname === "/posts"
                        ? "text-white font-semibold border-b-2 border-white"
                        : "text-gray-400"
                    }`}
                    href="/posts"
                  >
                    Posts
                  </Link>
                </li>
                <li>
                  <Link
                    className={`hover:text-gray-200 ${
                      pathname === "/posts/crear"
                        ? "text-white font-semibold border-b-2 border-white"
                        : "text-gray-400"
                    }`}
                    href="/posts/crear"
                  >
                    Crear Post
                  </Link>
                </li>
                <li>
                  <Link
                    className={`hover:text-gray-200 ${
                      pathname === "/posts/mis-posts"
                        ? "text-white font-semibold border-b-2 border-white"
                        : "text-gray-400"
                    }`}
                    href="/posts/mis-posts"
                  >
                    Mis Posts
                  </Link>
                </li>
                {user?.roles?.includes("admin") && (
                  <li>
                    <Link
                      href="/posts/admin"
                      className={`hover:text-gray-200 ${
                        pathname === "/posts/admin"
                          ? "text-white font-semibold border-b-2 border-white"
                          : "text-gray-400"
                      }`}
                    >
                      Admin
                    </Link>
                  </li>
                )}
              </ul>

              <div className="hidden xl:flex items-center space-x-5 items-center">
                <Link className="hover:text-gray-200" href="/posts/mis-likes">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Link>
                <DropdownPerfil />
              </div>
            </div>
          </nav>
        </section>
      </div>
    </>
  );
}
