"use client"
import { signIn, signOut, useSession } from "next-auth/react";
export const Button = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button className="text-green-600 ml-auto" onClick={() => signIn()}>
      {" "}
      Sign In{" "}
    </button>
  );
};
