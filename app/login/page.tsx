"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Session } from "next-auth"

export default function Login() {
  const { data: session } = useSession() as { data: Session | null }
  if (session) {
    return (
      <div>
        <h1 className="text-2xl mb-4 text-white bg-purple-500">Vous êtes connecté {session.user?.email}</h1>
        <button onClick={() => signOut()} className="btn">Se déconnecter</button>
        <a href="/admin" className="underline text-blue-400 mt-4 block">Accéder à l’admin</a>

      </div>
    )
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Connexion</h1>
      <button onClick={() => signIn("google")} className="btn">
        Se connecter avec Google
      </button>
      <button onClick={() => signIn("email")} className="btn ml-4">
        Se connecter par email
      </button>
    </div>
  )
}
