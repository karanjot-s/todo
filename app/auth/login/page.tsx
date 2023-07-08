"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "../Provider";
import Link from "next/link";

export default function Login({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user, login } = useAuth();

  const onSubmit = () => {
    setError(null);
    if (!username) window.alert("Please enter a username");
    if (!password) window.alert("Please enter a password");

    setLoading(true);
    login(username, password).then((err) => {
      if (!err)
        router.push(
          searchParams?.callbackUrl
            ? decodeURIComponent(searchParams.callbackUrl as string)
            : "/"
        );
      setError(err);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  return (
    <dialog
      open
      className="rounded-xl mt-10 bg-green-50 px-10 py-5"
      style={{ minWidth: "400px" }}
    >
      <h2 className="text-center text-2xl font-medium text-green-950 mb-5">
        Login
      </h2>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {error ? <p>{error}</p> : ""}
        <div className="flex flex-col">
          <label htmlFor="username" className="text-green-950">
            Username:{" "}
          </label>
          <input
            className="text-lg px-4 py-2 border-green-300 border rounded-lg outline-green-600 transition"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-green-950">
            Password:{" "}
          </label>
          <input
            className="text-lg px-4 py-2 border-green-300 border rounded-lg outline-green-600 transition"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="mt-2 bg-green-900 text-green-50 hover:bg-green-950 transition py-2 px-4 rounded-lg"
          type="submit"
          disabled={loading}
        >
          Login
        </button>
        <Link href="/auth/signup" className="text-green-700 underline">
          Signup instead?
        </Link>
      </form>
    </dialog>
  );
}
