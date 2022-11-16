import React, { useState, useContext, useEffect } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../Context"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Account() {
    const navigate = useNavigate()
    const { changeEmail, changePassword, changeName, changeBirthDate, event, userInfo, isLoggedIn } = useContext(Context)
const [startDate, setStartDate] = useState(new Date());
const birthDay = new Date(userInfo.birthDate)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/')
        }if (birthDay ){
            setStartDate(birthDay)
        }
    }, [isLoggedIn])

    
    
    return (
        <>
            {event && <h3>{event}</h3>}
            <form onSubmit={e => { changeBirthDate(e) }}>
      
              
                <h3>{birthDay ? "Change Birthday?" : "Set BirthDay?"}</h3>
  <h3>Birthday:<br></br>{startDate.getMonth()+1}/{startDate.getDate()}/{startDate.getFullYear()}
                </h3>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    name="birthDate" />
                <button type="submit">Submit</button>
            </form>

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