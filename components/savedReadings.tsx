'use client'
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';
import { ReadingType, UserType,SavedReadingType } from '@/utils/types';
import Reading from "./reading";
import Cards from "./cards";


export default function Saved({ id }: { id: string }) {
    const { data: session, status } = useSession();
    const [userReadings, setUserReadings] = useState<SavedReadingType[]>()

    const [startFetch, setStartFetch] = useState(true)

    async function getReadings(id:string){
        const res = await fetch(`../api/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-cache"
        }).then(res => res.json()).then(res => { setUserReadings(res.readings) })
    } 
    async function deleteReading(userId:string,reading:SavedReadingType){
        const add = false;
        if(userReadings){
        setUserReadings(userReadings.filter((reading)=>reading._id !== reading._id))
        const res = await fetch(`../api/users/${id}`, {
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
  }  }
    
    useEffect(() => {
        if (startFetch) {
            getReadings(id)
            setStartFetch(false)
        }
    },[startFetch,id,userReadings])
    return (<div>

{userReadings?.map(
    (reading:SavedReadingType)=>
    <div key={reading._id}>
        <h1>{reading.title}</h1>
        <Cards type={reading.cards.length > 4 ? 'CelticCrossReading' : ""} data={reading.cards} />
        <p>{reading.notes}</p>
        <button onClick={(()=>{deleteReading(id,reading)})}>Delete?</button>
        </div>
        )}
       

    </div>)
}