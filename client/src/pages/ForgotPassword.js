import React, { useContext, useEffect, useState } from "react"
import { Context } from "../Context"
import { useNavigate } from 'react-router-dom'

function ForgotPassword(){
    const navigate = useNavigate()
    const { userInfo, event, isLoggedIn, forgotPassword } = useContext(Context)

{event && <h3>{event}</h3>}
    useEffect(() => {
        if (isLoggedIn) {
          navigate('/Dashboard')
        }
    
      }, [isLoggedIn])
    return(<>


{event && <h3>{event}</h3>}
<h1>Forgot Password</h1>
<form onSubmit={e=>forgotPassword(e)}>
<label>Email:</label>
<input name="email" type="text" placeholder="Email"/>
<button  type="submit">
    Send
</button>
</form>
</>
    )
}

export default  ForgotPassword


//context

// async function forgotPassword(e) {
//     e.preventDefault()
//     Axios({
//       method: 'post',
//       url: "/forgotPassword",
//       data: {
//         email: e.target.email.value
//       }
//     })
   
//      }


// server
// app.post('/forgotPassword', async (req,res)=>{
//     const email = req.body.email
//     console.log(email)
// User.findOne({email},(err,result)=>{
//         if(err||!result){
//           res.json({err})
//         } else{

//       const token = jwt.sign({_id: result._id},reset,{expiresIn:'30min'})

//     let transporter = nodemailer.createTransport({
        
//         host:'tarot.reader.app@gmail.com',
//         port:'465',
//         secure:true,
//         auth:{
//             user:process.env.GOOGLE_USER,
//             pass:process.env.GOOGLE_PASS
//         }
//     })
//     const data = {
//         from:'no-reply@tarot--reader.vercel.app',
//         to:email,
//         subject:'Reset Account Password Link',
//         html:`
//         <h1>Click the link below to reset your password:</h1>
//         <p>tarot--reader.vercel.app/${token}</p>
//         `
//     }

//     let info = {
//         from: '"Tarot Reader" <no-reply@tarot--reader.vercel.app>', // sender address
//         to: email, // list of receivers
//         subject:'Reset Account Password Link',
//         html:`
//         <h1>Click the link below to reset your password:</h1>
//         <p>tarot--reader.vercel.app/${token}</p>
//         `
//       };


//     return User.updateOne({resetLink:token}, (err,user)=>{
//         if(err){
//             return res.status(400).json({error:'reset password link error'})
//         }else{
//             transporter.sendMail(info,(err,body)=>{
//                 if(err){
//                     return res.status(400).json({error:err.message})
//                 } else{
//                     console.log("sent!")
//                     return res.json({message: "Email has been sent, please follow insturctions"})
//                 }
//             })
//         }
//     })

//         }
//     })
// })



// app.post('/updatePassword', async (req,res)=>{
// const {token,password} = req.body
// if(token){
//     jwt.verify(token, reset, (err,decodedData)=>{
// if(err){
//     return res.json({err})
// }
// User.findOne({resetLink:token}, (err,user)=>{
//     if(err || !user){
//         return res.json({message: "user does not exist!"})
//     }
//       user.password = password
//     user.save((err,res)=>{
//         if(err){
//             return res.json({error:"reset password error"})
//         } else{
//             return res.json({message:"Your password has been changed"})
//         }
//     })
// })
//     })
// }
// } 
// )


// const secret = process.env.PASSWORD_KEY
// const reset = process.env.RESET_PASSWORD_KEY        

// let testAccount = await nodemailer.createTestAccount();
// let transporter1 = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });
