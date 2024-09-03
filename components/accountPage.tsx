'use client'
import { UserType } from '@/utils/types';
import { useSession } from 'next-auth/react';
import { useState, useEffect, ReactEventHandler } from 'react';
import { redirect, useRouter } from 'next/navigation';

export default function AccountPage() {
    const { data: session, status } = useSession();
    const [userInfo, setUserInfo] = useState<UserType>()
    const [getuserInfo, setGetUserInfo] = useState(true)
    const [date, setDate] = useState("")
    const [name, setName] = useState("")
    const router = useRouter();
    const id = session?.user?.id.toString() || "redirect"

    useEffect(() => {
        if (getuserInfo) {
            if (id === "redirect") {
                redirect(`/api/auth/signin`)
            }
            getUser(id)
            setGetUserInfo(!getuserInfo)
        }
    }, [getuserInfo, id])

    useEffect(() => {
        if (userInfo) {
            getDate(userInfo?.birthDate)
            setName(userInfo.name)
        }

    }, [userInfo])

    async function getUser(id: string) {
        const res = await fetch(`/api/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-cache"
        }).then(res => res.json()).then(res => { setUserInfo(res) })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch(`/api/users/${id}/changeUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: id, name, birthDate: date
            }),
            cache: "no-cache"
        })
        if (res) {
            router.refresh()
            setGetUserInfo(true)
        }


    }

    function getDate(date: string) {
        const birthday = new Date(date)
        let month = birthday.getMonth() + 1
        let day = birthday.getDate() + 1
        const startDate = `${birthday.getFullYear()}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`
        setDate(startDate)
    }


    if (userInfo) {
        return (
            <div className="account"><h1>Hello {userInfo.name}!</h1>
                <h2>What are we looking to change today?</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h3>{name}</h3>
                    <input value={name} onChange={(e) => { setName(e.target.value) }} />
                    {date ? <h3>Birthday:<br></br>{date}
                    </h3> : <h3>set up your birthday!</h3>}
                    <input type='date' value={date} onChange={(e) => { setDate(e.target.value) }} />
                    <input type="submit" value="Submit Changes" />
                </form>

            </div>)
    }
}