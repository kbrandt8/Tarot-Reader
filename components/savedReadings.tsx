'use client'
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';
import { ReadingType, UserType, SavedReadingType } from '@/utils/types';
import { useRouter } from 'next/navigation'
import Cards from "./cards";


export default function Saved({ id }: { id: string }) {
    const { data: session, status } = useSession();
    const router = useRouter()
    const [userReadings, setUserReadings] = useState<SavedReadingType[]>()
    const [startFetch, setStartFetch] = useState(true)
    const [message,setMessage] = useState("")

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
        if (userReadings && userReadings.length > 0) {
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
        console.log(userReadings,startFetch)

        if (startFetch) {
            getReadings(id)
            setStartFetch(false)
        }
    }, [startFetch, id, userReadings])

    const allReadings = userReadings?.map(
        (reading: SavedReadingType) =>
            <div key={reading._id}>
                <h1>Title: {reading.title}</h1>
                <Cards type={reading.cards.length > 4 ? 'CelticCrossReading' : ""} data={reading.cards} />
                <p>Notes: {reading.notes}</p>
                <p>Date: {reading.date.toString()}</p>
                <button onClick={((e) => { deleteReading(id, reading, e); })}>Delete?</button>
            </div>
    )
    if (userReadings && userReadings.length > 0) {
        return (<div>
            {allReadings}

        </div>)
    } else{
        <h1>Go save some readings!</h1>
    }

}