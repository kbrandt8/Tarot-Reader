import express from "express"
const app = express()
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Card, Readings, User} from "./models/index.js"
import tarotDoc2 from "./tarotDoc2.js"

dotenv.config()
app.use(express.json())
app.use(cors())

const __dirname = dirname(fileURLToPath(import.meta.url))

mongoose.connect(process.env.MONGO_URL)

const port = process.env.PORT || 7000

app.post('/register', async (req,res)=>{
    try {
        const newPassword = await bcrypt.hash(req.body.password,10)
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:newPassword
        })
        await newUser.save()
        res.json({status:'ok'})
    } catch (err) {
        res.json({status: 'error'})
        console.log(err)
        
    }
})

app.post('/login', async (req,res)=>{
    try {
        const logUser = await User.findOne({
            email:req.body.email
        })
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            logUser.password
        )
        if(isPasswordValid){
            const token = jwt.sign({
                name:logUser.name,
                email:logUser.email
            },'token')
            return res.json({status:'ok',user:token})
        }
    } catch (err) {
        return res.json({status:'error',user:false})
    }
})

app.get('/userinfo', async (req,res)=>{
    const token = req.headers['x-access-token']
try {
    const decoded = jwt.verify(token,'token')
    const email = decoded.email
    const user = await User.findOne({email:email})
    return res.json({
        status:'ok',
        name:user.name,
        birthCard:user.birthCard,
        email:user.email,
        readings:user.readings
})
} catch (err) {
    res.json({ status: 'error', error: 'invalid token' })
}

})


app.post('/addReading', async (req,res)=>{
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'token')
        const email = decoded.email

        await User.updateOne(
         {email:email }, 
         { $push: {readings:{
         title:req.body.title,
         date:req.body.date,
         cards:req.body.cards,
         notes:req.body.notes
        }
        }}
        )
 console.log(req.body.title)
        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }

})

app.post('/deleteReading', async (req,res)=>{
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token,'token')
        const email = decoded.email
        await User.updateOne(
         {email:email }, 
         { $pull: { readings:{_id: req.body.id }} })
    } catch (err) {
        console.log(err)
        res.json({status:'error',error: 'invalid token'})
    }
})

app.post('/tarot', async(req,res)=>{
Card.insertMany(tarotDoc2)
.then(function(docs){
    res.json(docs)
}).catch(function (err){
    res.status(500).send(err)
})
})

app.get("/oneCard",(req,res)=>{
   Card.aggregate(
    [{$sample: {size:1}}]
   ,(err,result)=>{
if(err){
    res.json(err)
}else{res.json(result)}
   })
})

app.get("/threeCards",(req,res)=>{
    Card.aggregate(
     [{$sample: {size:3}}]
    ,(err,result)=>{
 if(err){
     res.json(err)
 }else{res.json(result)}
    })
 })

 app.get("/oneCard",(req,res)=>{
    Card.aggregate(
     [{$sample: {size:1}}]
    ,(err,result)=>{
 if(err){
     res.json(err)
 }else{res.json(result)}
    })
 })


 app.get("/birthCard",(req,res)=>{
    const num = parseInt(req.headers['num'])
    Card.find({
    num:num
    },(err,result)=>{
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join('client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is ALIVE on ${port}!`)
})