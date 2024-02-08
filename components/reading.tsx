'use client'
import { ReadingType, CardType } from "@/utils/types";
import Cards from "./cards";
import useSWR, { mutate } from 'swr'
import { useState } from "react";
export default function Reading({ type }:
    {
        type: string
    }) {

    const fetcher = (arg: string) => fetch(arg).then(res => res.json())
    const [startReading,setStartReading] = useState(false)
    const { data, error, isLoading, mutate} = useSWR(startReading ? `/api/${type}` : null, fetcher);
    return (<>
        <button onClick={() => {!startReading ? setStartReading(true) :  mutate(`/api/${type}`) }}>Get Reading</button>
        {startReading &&
          data && 
          data.cards ?<Cards data={data.cards} type={type}/> : <h1></h1>
        }
   
    </>)

}
