'use client'
import { ReadingType, CardType } from "@/utils/types";
import Image from 'react-bootstrap/Image';

export default function Meaning({ data, type }:
    {
        data: [CardType],
        type: string
    }) {
    return (
        <div >
            {
                data.map((card: CardType) => <div
                    key={card._id}
                    id={card._id.toString()}
                >
                    <h3 className="tarotTitle">{card.title}: {card.name} ({card.isReversed ? "Reversed" : "Upright"})</h3>
                    <div className="tarotMeaning">
                        <Image src={'../' + card.url} alt={card.name} className={card.isReversed ? 'reversed' : ""} />
                        <p>{card.isReversed ? card.reversed : card.upright}</p>
                    </div>

                </div>)
            }

        </div>)
}