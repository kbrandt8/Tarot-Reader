
import { TarotCard } from '@/utils/styled-props'
import Reading from '@/components/reading'
export default async function Page({ params }: { params: { reading: string } }) {
    const { reading } = params
    return (<main>
        <Reading type={reading} />

    </main>)
}