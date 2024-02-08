'use client'
import { CelticCross, CelticCrossCard, ReadingDiv, TarotCard } from "@/utils/styled-props";
import { ReadingType, CardType } from "@/utils/types";
import { useState, useEffect } from 'react';


export default function Reading({ data, type }:
    {
        data: [CardType],
        type: string
    }) {

    const [windowSize, setWindowSize] = useState(300)
    const readingWidth = windowSize * .75
    const readingHeight = readingWidth / 1.5

    useEffect(() => {
        setWindowSize(window.innerWidth)
    },[])

    if (type === "CelticCrossReading") {
        const tarotReading = data.map(
            (card: CardType) =>
                <CelticCrossCard
                    $url={card.url}
                    $reversed={card.isReversed}
                    key={card.id}
                    title={`${card.title}: ${card.name} \(${card.isReversed ? "Reversed" : "Upright"}\)`} />)
        return (
            <CelticCross $height={readingHeight + `px`} $width={readingWidth + 'px'}>
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
                    key={card.id}
                    title={`${card.title}: ${card.name} \(${card.isReversed ? "Reversed" : "Upright"}\)`} />)
        return (
            <ReadingDiv $height={readingHeight + `px`} $width={readingWidth + 'px'}>
                {tarotReading}
            </ReadingDiv>
        )
    }
}