import React, { useState, useContext, useEffect } from "react"
import { getDefaultLocale } from "react-datepicker"
import { useNavigate} from 'react-router-dom'
import { Context } from "../Context"

function Account() {
    const navigate = useNavigate()
    const { changeEmail, changePassword, changeName, changeBirthDate, event, userInfo, isLoggedIn } = useContext(Context)
    const [isDisabled,setIsDisabled] = useState(false)
    const [startDate,setStartDate] = useState("")
const birthDay = new Date(userInfo.birthDate)
const regEx = new RegExp(/^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)

const regExMonth = new RegExp(/\d\d/)
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn])



    useEffect(()=>{
        if(regEx.test(startDate)){
           setIsDisabled(false)
           console.log(startDate)
        }else{
           setIsDisabled(true)
           console.log(startDate)
        }
    },[startDate])


    
    
    return (
        <div>
            {event && <h3>{event}</h3>}
            <form onSubmit={e => { changeBirthDate(e) }}> 
      
              
                <h3>{birthDay ? "Change Birthday?"  : "Set BirthDay?"}</h3>
{birthDay &&                <h3>Birthday:<br></br>{birthDay.getMonth()+1}/{birthDay.getDate()}/{birthDay.getFullYear()}
                </h3>}
               <h3> {isDisabled && "Please enter date in mm/dd/yyyy format"}</h3>

                    <input
                    placeholder="mm/dd/yyyy"
                    onChange={(e)=>{setStartDate(e.target.value)}}
                    value={startDate}
                    name="birthDate"
                    />
                <button disabled={isDisabled} type="submit">Submit</button>
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


        </div>
    )
}

export default Account