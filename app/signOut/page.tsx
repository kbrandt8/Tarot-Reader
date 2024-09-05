'use client'
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function SignOut() {
    const router = useRouter()

    return (<main>
        <button onClick={() => { signOut(); router.push("/") }}>Sign Out?</button>
    </main>)
}