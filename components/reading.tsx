'use client'
import { ReadingType, CardType, SavedReadingType } from "@/utils/types";
import Cards from "./cards";
import useSWR, { mutate } from 'swr'
import { useSession } from 'next-auth/react';
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function Reading({ type }:
    {
        type: string
    }) {

    const router = useRouter()
    const { data: session, status } = useSession();
    const user_id = session?.user?.id
    const fetcher = (arg: string) => fetch(arg).then(res => res.json())
    function theDate() {
        const date = new Date()
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getFullYear())
    }
    console.log(theDate())
    async function addReading(id: string, e: React.FormEvent) {
        e.preventDefault();
        if (id && title) {
            const reading = {
                date: theDate(),
                title,
                notes,
                cards: data.cards,
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
            router.push(`/savedreadings/${user_id}`)
        }
        else {
            alert("The title field is required")
        }
    }
    const [startReading, setStartReading] = useState(false)
    const [notes, setNotes] = useState("")
    const [title, setTitle] = useState("")
    const { data, error, isLoading, mutate } = useSWR(startReading ? `/api/readings/${type}` : null, fetcher);
    return (<>
        <button onClick={() => { !startReading ? setStartReading(true) : mutate(`/api/${type}`) }}>Get Reading</button>
        {startReading &&
            data &&
            data.cards ? <Cards data={data.cards} type={type} /> : <h1 className="readingHeader">{type}</h1>
        }
        {
            data && user_id ?
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
