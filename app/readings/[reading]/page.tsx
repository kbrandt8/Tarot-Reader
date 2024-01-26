
import { getReading } from '@/utils/readings'
import { TarotCard } from '@/utils/styled-props'
import Reading from '@/components/reading'
export default async function Page({ params }: { params: { reading: string } }) {
    const { reading } = params
    const data = await getReading(reading)
    return (<main>

        <Reading data={data} />

    </main>)
}