'use client'
import { CelticCross, CelticCrossCard, ReadingDiv, TarotCard } from "@/utils/styled-props";
import { ReadingType, CardType } from "@/utils/types";
import { useState, useEffect } from 'react';


export default function Reading({ data, type }:
    {
        data: [CardType],
        type: string
    }) {

    if (type === "CelticCrossReading") {
        const tarotReading = data.map(
            (card: CardType) =>
                <CelticCrossCard
                    $url={card.url}
                    $reversed={card.isReversed}
                    key={card._id}
                    title={`${card.title}: ${card.name} \(${card.isReversed ? "Reversed" : "Upright"}\)`} />)
        return (
            <CelticCross className="cards">
                {tarotReading}
            </CelticCross>
        )

    }
    else {
        const tarotReading = data.map(
            (card: CardType) =>
                <TarotCard
                    $url={card.url}
                    $reversed={card.isReversed}
                    key={card._id}
                    title={`${card.title}: ${card.name} \(${card.isReversed ? "Reversed" : "Upright"}\)`} />)
        return (
            <ReadingDiv className="cards">
                {tarotReading}
            </ReadingDiv>
        )
    }
}