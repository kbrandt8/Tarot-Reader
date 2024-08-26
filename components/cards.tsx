'use client'
import { CelticCross, CelticCrossCard, ReadingDiv, TarotCard } from "@/utils/styled-props";
import { ReadingType, CardType } from "@/utils/types";
import { useState, useEffect } from 'react';
import Meaning from "./meaning";
import Link from "next/link";


export default function Reading({ data, type }:
    {
        data: [CardType],
        type: string
    }) {

    if (type === "CelticCrossReading") {
        const tarotReading = data.map(
            (card: CardType) =>
                <CelticCrossCard
                    className="celticCard"
                    $url={card.url}
                    $reversed={card.isReversed}
                    key={card._id}
                    title={`${card.title}: ${card.name} \(${card.isReversed ? "Reversed" : "Upright"}\)`} />)
        return (
            <div className="tarotReading">
                <h1 className="readingHeader">{type}</h1>
                <CelticCross className="cards">
                    {tarotReading}
                </CelticCross>
                <Meaning data={data} type={type} />
            </div>
        )

    }
    else {
        const tarotReading = data.map(
            (card: CardType) =>
                <TarotCard
                    key={card._id}
                    className="tarotCard"
                    $url={card.url}
                    $reversed={card.isReversed}
                    title={`${card.title}: ${card.name} \(${card.isReversed ? "Reversed" : "Upright"}\)`} />
        )
        return (
            <div className="tarotReading">
                <h1 className="readingHeader">{type}</h1>
                <ReadingDiv className="cards">
                    {tarotReading}
                </ReadingDiv>
                <Meaning data={data} type={type} />
            </div>
        )
    }
}