import React, { useState, useContext, useEffect } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../Context"


function Account() {
    const navigate = useNavigate()
    const { changeEmail, changePassword,changeName, event, userInfo, isLoggedIn } = useContext(Context)
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn])
    return (
        <>
            {event && <h3>{event}</h3>}
                       <form onSubmit={e => { changeName(e) }}>
            <h3>Name:<br></br>{userInfo.name}</h3>
                <label>Change Name?</label>
                <input placeholder="New Name" type="text" name="name" />
                <button type="submit">Submit</button>
            </form> 
            <form onSubmit={e => { changeEmail(e) }}>
                <h3>Email:<br></br>{userInfo.email}</h3>
                <label>Change Email?</label>
                <input placeholder="New Email" type="email" name="email" />
                <input placeholder="Current Password" type="password" name="password" />
                <button type="submit">Submit</button>
            </form>
            <form onSubmit={e => { changePassword(e) }}>
                <label>Change Password?</label>
                <input placeholder="Current Password" type="password" name="currentPassword" />
                <input placeholder="New Passowrd" type="password" name="newPassword" />
                <button type="submit">Submit</button>
            </form>


        </>
    )
}

export default Account