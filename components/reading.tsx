'use client'
import { CelticCross, CelticCrossCard, ReadingDiv, TarotCard } from "@/utils/styled-props";
import { ReadingType, CardType } from "@/utils/types";
import {useState} from 'react';


export default function Reading({ data }:
    {
        data: ReadingType
    }) {

 window.addEventListener('resize', handleResize);
 function handleResize(){
    setWindowSize(window.innerWidth)
 }
    const [windowSize,setWindowSize] = useState(300)
    const readingWidth = windowSize * .75
    const readingHeight = readingWidth / 1.5

    if (data.numCards < 5) {
        const tarotReading = data.cards.map(
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
    else {
        const tarotReading = data.cards.map(
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
}