'use client'
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { FaLinkedin, FaGithub, FaMailBulk, FaMailchimp, FaEnvelope, FaGoogle } from "react-icons/fa";
import Link from "next/link";

export default function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    async function emailSignIn(e: React.FormEvent) {
        e.preventDefault();
        const response: any = await signIn("credentials", {
            email, password,
        });
        if (!response?.error) {
            router.push("/savedreadings");
        }
    }

    return (
        <main className="signIn">
            <h2>Sign In With...</h2>
            <button onClick={() => { signIn('github'); }}>Github <FaGithub /></button>
            <button onClick={() => { signIn('google'); }}>Google <FaGoogle /></button>
            <h2>Email</h2>
            <form onSubmit={(e) => { emailSignIn(e) }}>
                <label>Email: </label><input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <label>Password: </label><input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <button type="submit">Sign In</button>
            </form>
            <h2>
                <Link href={"/register"}>Register With Email</Link>
            </h2>

        </main >
    )
}