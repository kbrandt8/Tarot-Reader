import AccountPage from "@/components/accountPage"
export default async function Page({ params }: { params: { user_id: string } }) {
    const { user_id } = params
    return (<main>
        <AccountPage id={user_id} />
    </main>)
}