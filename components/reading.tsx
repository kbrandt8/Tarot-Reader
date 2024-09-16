'use client'
import { ReadingType, CardType, SavedReadingType } from "@/utils/types";
import Cards from "./cards";
import { useSession } from 'next-auth/react';
import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function Reading({ type }:
    {
        type: string
    }) {
    const [startReading, setStartReading] = useState(false)
    const [notes, setNotes] = useState("")
    const [title, setTitle] = useState("")
    const [cards, setCards] = useState()
    const [birthDate, setBirthDate] = useState("")
    const router = useRouter()
    const { data: session, status } = useSession();
    const user_id = session?.user?.id
    function theDate() {
        const date = new Date()
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getFullYear())
    }
    async function addReading(id: string, e: React.FormEvent) {
        e.preventDefault();
        if (id && title) {
            const reading = {
                date: theDate(),
                title,
                notes,
                cards: cards,
            }
            const add = true;
            const res = await fetch(`../api/users/${id}/readings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    reading, add
                }),
                cache: "no-cache"
            })
            router.push(`/savedreadings/`)
        }
        else {
            alert("The title field is required")
        }
    }

    useEffect(() => {
        if (startReading) {
            if (birthDate !== "") {
                const getCards = async () => {
                    const date = theDate()
                    const res = await fetch(`/api/todaysCard`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "birth": birthDate.toString(),
                            "date": date.toString()
                        }),
                        cache: "no-cache"
                    })
                    const reading = await res.json()
                    setCards(reading.cards)
                    setStartReading(false)
                }
                getCards()
            } else {
                const getCards = async () => {
                    const res = await fetch(`/api/readings/${type}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        cache: "no-cache"
                    })
                    const reading = await res.json()
                    setCards(reading.cards)
                }
                getCards()
                setStartReading(false)
            }
        }
    }, [startReading, birthDate, type])



    if (type === "TodaysCard") {
        return (
            <>
                {cards ?
                    <Cards data={cards} type={type} /> : <h1 className="readingHeader">{type}</h1>
                }
                {!cards &&
                    <div>
                        <h3>This reading uses your birthday,
                            and the current date to calculate a number in numerology, and show you the corresponding major arcana.
                        </h3>
                        <form onSubmit={() => { setStartReading(true) }} className="birthdayForm">
                            <label>Birthday</label>
                            <input type="date" name="birthday" onChange={(e) => { setBirthDate(e.target.value) }} />
                            <button type="submit">Get Card</button>
                        </form>
                    </div>}
            </>
        )
    }
    else {
        return (<>
            <h1 className="readingHeader">{type.replace(/([A-Z])/g, ' $1').trim()}</h1>

            {cards ? <Cards data={cards} type={type} /> : <button onClick={() => { setStartReading(true) }}>Get Reading</button>}
            {
                cards && user_id ?
                    <Form className="border-image" onSubmit={(e) => { addReading(user_id, e); }}>
                        <h3>Save reading?</h3>
                        <FloatingLabel
                            controlId="floatingTitle"
                            label="Title"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="title" onChange={(e) => { setTitle(e.target.value) }} value={title} />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingNotes"
                            label="Notes"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="notes" onChange={(e) => { setNotes(e.target.value) }} value={notes} />
                        </FloatingLabel>

                        <button title="Submit" type="submit" >Submit</button>

                    </Form> :
                    <></>

            }
        </>)
    }

}
