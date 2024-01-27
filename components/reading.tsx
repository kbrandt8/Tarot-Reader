'use client'
import { ReadingType, CardType } from "@/utils/types";
import Cards from "./cards";

export default function Reading({ data }:
    {
        data: ReadingType
    }) {
    return (
    <div>
        <Cards data={data.cards} />
    </div>
           )

}



