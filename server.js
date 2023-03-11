import express from "express"
const app = express()
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Card, Card2, User} from "./models/index.js"
import tarotDoc2 from "./tarotDoc2.js"
import path from 'path'

dotenv.config()
app.use(express.json())
app.use(cors())

const __dirname = dirname(fileURLToPath(import.meta.url))

mongoose.connect(process.env.MONGO_URL)

const port = process.env.PORT || 7000

app.post('/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
       newUser.save()
        const token = jwt.sign({
            name: req.body.name,
            email: req.body.email,
        }, 'token')
        return res.json({ status: 'ok', user: token })
    } catch (err) {
        res.json({ status: 'error' })
        console.log(err)

    }
})

app.post('/login', async (req, res) => {
    try {
        const logUser = await User.findOne({
            email: req.body.email
        })
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            logUser.password
        )
        if (isPasswordValid) {
            const token = jwt.sign({
                name: logUser.name,
                email: logUser.email,
            }, 'token')
            return res.json({ status: 'ok', user: token })
        }
    } catch (err) {
        return res.json({ status: 'error', user: false })
    }
})
app.post('/changeEmail', async (req, res) => {
    const token = req.headers['x-access-token']
    const newEmail = req.body.email
    const decoded = jwt.verify(token, 'token')
    const email = decoded.email
    const logUser = await User.findOne({
        email: email
    })
    try {
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            logUser.password
        )
        if (isPasswordValid) {
            await User.findOneAndUpdate(
                { email: email }, { email: newEmail }
            )
            const token = jwt.sign({
                email: newEmail
            }, 'token')

            return res.json({ status: 'ok', user: token })
        }

    } catch (err) {
        console.log(err)
    }
})
app.post('/changePassword', async (req, res) => {
    const token = req.headers['x-access-token']
    const newPassword = await bcrypt.hash(req.body.newPassword, 10)
    const decoded = jwt.verify(token, 'token')
    const email = decoded.email
    const logUser = await User.findOne({
        email: email
    })
    try {
        const isPasswordValid = await bcrypt.compare(
            req.body.currentPassword,
            logUser.password
        )
        if (isPasswordValid) {
            await User.findOneAndUpdate(
                { email: email }, { password: newPassword }
            )
            return res.json({ status: 'ok', user: token })
        }

    } catch (err) {
        console.log(err)
    }
})
app.post('/changeName', async (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, 'token')
    const email = decoded.email
    try {
        await User.findOneAndUpdate(
            { email: email }, { name: req.body.name }
        )
        return res.json({ status: 'ok', user: token })

    } catch (err) {
        console.log(err)
    }
})
app.post('/addBirthDate', async (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, 'token')
    const email = decoded.email
    console.log(req.body.birthDate)
    try {
        await User.findOneAndUpdate(
            { email: email }, { birthDate: req.body.birthDate }
        )
        return res.json({ status: 'ok', user: token })

    } catch (err) {
        console.log(err)
    }
})

app.get('/userinfo', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'token')
        const email = decoded.email
        const user = await User.findOne({ email: email })
        console.log(user)
        return res.json({
            status: 'ok',
            name: user.name,
            birthCard: user.birthCard,
            birthDate:user.birthDate,
            email: user.email,
            readings: user.readings
        })
    } catch (err) {
        res.json({ status: 'error', error: 'invalid token' })
        res.clearCookie("jwt");
        res.redirect("/");
        console.log(err)
    }

})


app.post('/addReading', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'token')
        const email = decoded.email

        await User.updateOne(
            { email: email },
            {
                $push: {
                    readings: {
                        title: req.body.title,
                        date: req.body.date,
                        cards: req.body.cards,
                        notes: req.body.notes
                    }
                }
            }
        )
        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }

})

app.post('/deleteReading', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'token')
        const email = decoded.email
        await User.updateOne(
            { email: email },
            { $pull: { readings: { _id: req.body.id } } })
    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.post('/tarot', async (req, res) => {
    Card.insertMany(tarotDoc2)
        .then(function (docs) {
            res.json(docs)
        }).catch(function (err) {
            res.status(500).send(err)
        })
})

app.post('/tarot2', async (req, res) => {
    Card2.insertMany(tarotDoc2)
        .then(function (docs) {
            res.json(docs)
        }).catch(function (err) {
            res.status(500).send(err)
        })
})

app.get("/getReading", (req, res) => {
    const type = req.headers['type']
    const one = ["One Card Reading"]
    const three = ["Past", "Present", "Future"]
    const four = ["Question", "Expectation", "Answer", "Why"]
    const celtic = ["Question","Situation","Root","Past","Possibilities","Future","Querent","What Helps","What Hurts","Outcome"]
    let num = 0
    
    let title = []

    if (type === "oneCard") {
        num = 1
        title = one
    } if (type === "threeCards") {
        num = 3
        title = three
    } if (type === "fourCards") {
        num = 4
        title = four
    } if (type ==="celticCross"){
        num = 10
        title = celtic
    }

    Card.aggregate(
        [{ $sample: { size: num } }]
        , (err, result) => {
            if (err) {
                res.json(err)
            } else {
               result.forEach(card=>
                { 
                    card.title = title[result.indexOf(card)];
                    card.isReversed = Math.floor(Math.random() * 10) > 5 ? true : false;
                })
                res.json(result)
            }
        })
})


app.get("/birthCard", (req, res) => {
    const num = parseInt(req.headers['num'])
    Card.find({
        num: num
    }, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.get("/getArcana",  (req, res) => {
    const num1 = parseInt(req.headers['num1'])
    const num2 = parseInt(req.headers['num2'])

  Card.find({
    num: [ num1, num2 ]
    }, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })

})

 
    if (process.env.production=== 'heroku') {
    app.use(express.static(path.join('client/build')));
       app.get('*', (req, res) => {
         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
       });
   }
   
   if(process.env.production === 'vercel')
   {
    
       app.use(express.static(path.join(__dirname, "client/build")));
   
   app.get("*", function(_, res) {
       res.sendFile(
           path.join(__dirname, "client/build/index.html"),
           function (err) {
               if(err) {
                   res.status(500).send(err)
               }
           }
       )
   })}
   
   
   app.listen(port,()=>{
       console.log(`Server is ALIVE on ${port}!`)
   })   