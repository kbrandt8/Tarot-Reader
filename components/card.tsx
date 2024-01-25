'use client'
import Image from "next/image";
import { CardType } from "@/utils/types";
import twoCups from '@/app/img/2cup.jpg'

export default function Card({ data }: { data: CardType }) {
    return (
        <>
<Image src={data.url} height={521} width={300} alt={data.name}/>
        </>
        )}