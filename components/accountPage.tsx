'use client'
import { UserType } from '@/utils/types';
import { useSession } from 'next-auth/react';
import { useState, useEffect, ReactEventHandler } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountPage({ id }: { id: string }) {
    const { data: session, status } = useSession();
    const [userInfo, setUserInfo] = useState<UserType>()
    const [getuserInfo, setGetUserInfo] = useState(true)
    const [date, setDate] = useState("")
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const router = useRouter();

    useEffect(() => {
        if (getuserInfo) {
            getUser(id)
            setGetUserInfo(!getuserInfo)
        }
    }, [getuserInfo, id])

    useEffect(()=>{
        if (userInfo) {
            getDate(userInfo?.birthDate)
            setName(userInfo.name)
            setEmail(userInfo.email)
        }

    },[userInfo])

    async function getUser(id: string) {
        const res = await fetch(`../api/email/getUser/getUserInfo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: id
            }),
            cache: "no-cache"
        }).then(res => res.json()).then(res => { setUserInfo(res) })
    }
    async function handleSubmit(e: React.ChangeEvent<any>){
        e.preventDefault();
        const res = await fetch('../api/email/changeUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id:id,name, email,birthDate:date
            })
        })
        if(res.ok){
            router.refresh();
            setGetUserInfo(true);
        }

    }

    function getDate(date: string) {
        const birthday = new Date(date)
        console.log(birthday)
        const startDate = `${birthday.getFullYear()}-${"0" + (birthday.getMonth() + 1)}-${"0" + birthday.getDate()}`
        setDate(startDate)
    }

    
    if (userInfo) {
        return (
            <div><h1>Hello {userInfo.name}!</h1>
                <h1>What are we looking to change today?</h1>
                <form onSubmit={handleSubmit}>
                <h2>{userInfo.name}</h2>
                <input value={name} onChange={(e)=>{setName(e.target.value)}}/>
                {date ? <h3>Birthday:<br></br>{date}
                </h3> : <h3>set up your birthday!</h3>}
                <input type='date' value={date} onChange={(e) => { setDate(e.target.value) }} />
                <h2>{userInfo.email}</h2>
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <input type="submit" value="Submit Changes"/>
                </form>

            </div>)
    }
}