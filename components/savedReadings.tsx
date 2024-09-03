'use client'
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';
import { ReadingType, UserType, SavedReadingType } from '@/utils/types';
import { redirect, useRouter } from 'next/navigation';
import Cards from "./cards";
import Link from "next/link";


export default function Saved() {
    const { data: session, status } = useSession();
    const router = useRouter()
    const [userReadings, setUserReadings] = useState<SavedReadingType[]>()
    const [startFetch, setStartFetch] = useState(true)
    const [message, setMessage] = useState("")
    const id = session?.user?.id.toString() || "redirect"

    async function getReadings(id: string) {
        const res = await fetch(`../api/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-cache"
        }).then(res => res.json()).then(res => { setUserReadings(res.readings) })
    }

    async function deleteReading(userId: string, reading: SavedReadingType, e: React.FormEvent) {
        e.preventDefault();
        const add = false;
        if (confirm(`Are you sure you want to delete ${reading.title}?`)) {
            try {
                const res = await fetch(`../api/users/${userId}/readings`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        reading, add
                    }),
                    cache: "no-cache"
                }
                )
                setStartFetch(true)
            } catch (error) {
                setMessage("Error")
            }
        }
    }

    useEffect(() => {
        if (id === "redirect") {
            redirect(`/api/auth/signin`)
        } else if (startFetch) {
            getReadings(id)
            setStartFetch(false)
        }
    }, [startFetch, id, userReadings])

    const allReadings = userReadings?.map(
        (reading: SavedReadingType) =>
            <div key={reading._id} className="savedReading">
                {reading.title ? <h1>{reading.title}</h1> : <h1>No title</h1>}
                <Cards type={reading.cards.length > 4 ? 'CelticCrossReading' : ""} data={reading.cards} />
                <div className="border-image">
                    <p>Notes: {reading.notes}</p>
                    <p>Date: {reading.date.toString()}</p>
                    <button onClick={((e) => { deleteReading(id, reading, e); })}>Delete?</button>
                </div></div>
    )
    if (userReadings && userReadings.length > 0) {
        return (<div>
            {allReadings}
        </div>)
    } else {
        return (<main>
            <h1>Save some readings!</h1>
            <ul className="readingsList">
                <li><h1><Link href={`/readings/ThreeCardReading`}> One Card</Link></h1></li>
                <li><h1><Link href={`/readings/FourCardReading`}>Three Cards</Link> </h1></li>
                <li><h1><Link href={`/readings/CelticCrossReading`}>Celtic Cross</Link> </h1></li>
                <li><h1><Link href={`/readings/OneCardReading`}>One Card Reading</Link> </h1></li>
            </ul>
        </main>)
    }

}