export default async function Page({ params }: { params: { reading: string } }) {
    const { reading } = params
    const title = reading.match(/[A-Z][a-z]+/g)?.join(" ")
    return (<main>

        <h1>{title}</h1>
        <div className="deck">

        </div>

    </main>)
}