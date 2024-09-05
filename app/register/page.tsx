'use client'
import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function NewUser() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const router = useRouter()
    async function register(e: React.FormEvent) {
        e.preventDefault();
        if (passwordsMatch && name !== "" && email !== "") {
            try {
                const res = await fetch('/api/email/signup', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name, email, password
                    }),
                })
                const message = await res.json()
                if (message.userCreated) {
                    router.push("/sign-in")
                } else {
                    alert(message.message)
                }
            } catch (error) {
                alert("Something went wrong, try again!")
            }
        } else if (!passwordsMatch) {
            alert("Passwords Must Match!")
        } else if (name === "") {
            alert("Name is required!")
        } else if (email === "") {
            alert("Email is required!")
        }
    }

    return (
        <main className="signIn">
            <h2>Register</h2>
            <form onSubmit={(e) => { register(e) }}>
                <label>Name:</label><input type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                <label>Email Address:</label> <input type="email" placeholder="yourname@domain.com" onChange={(e) => { setEmail(e.target.value) }} />
                <label>Password:</label><input type="password" onChange={(e) => { setPassword(e.target.value) }} />
                <label>Repeat Password:</label><input type="password" onChange={(e) => { e.target.value === password ? setPasswordsMatch(true) : setPasswordsMatch(false) }} />
                <button type="submit">Register</button>
            </form>
        </main>
    )
}