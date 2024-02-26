import Saved from "@/components/savedReadings"

export default async function Page({ params }: { params: { userid: string } }) {
    const { userid } = params

    return (
        <main>
            <Saved id={userid} />
       </main>
    )
}