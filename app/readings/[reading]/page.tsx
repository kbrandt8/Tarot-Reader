import Card from '@/components/card'
import { getReading } from '@/utils/readings'
import { CardType } from '@/utils/types'
export default async function Page({ params }: { params: { reading: string } }) {
    const { reading } = params
    const title = reading.match(/[A-Z][a-z]+/g)?.join(" ")
    const data = await getReading(reading)
    const result = await data.map((card: CardType) => <Card key={card.id} data={card} />)
    return (<main>

        <h1>{title}</h1>
        <div className="deck">
            {result}

        </div>

    </main>)
}