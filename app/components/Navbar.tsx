"use client";

import Link from "next/link";
import { useAuth } from "../auth/Provider";

export default function Navbar() {
  const { user, signOut } = useAuth();
  return (
    <nav className="flex justify-between items-center px-10 py-4">
      <h1 className="text-white font-medium text-xl">Todo App</h1>
      {!user ? (
        <div className="flex gap-1">
          <Link
            className="border-green-950 border text-green-300 hover:bg-green-950 hover:text-green-50 transition py-2 px-4 rounded-lg"
            href="/auth/login"
          >
            Login
          </Link>
          <Link
            className="border-green-950 border text-green-300 hover:bg-green-950 hover:text-green-50 transition py-2 px-4 rounded-lg"
            href="/auth/signup"
          >
            Signup
          </Link>
        </div>
      ) : (
        <>
          <button
            className="border-red-950 border text-red-300 hover:bg-red-950 hover:text-red-50 transition py-2 px-4 rounded-lg"
            onClick={signOut}
          >
            Sign out
          </button>
        </>
      )}
    </nav>
  );
}
