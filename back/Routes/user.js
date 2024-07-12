//1. zod schemas, 2 .creating a new user in user and task collection , 3.  jwt ,
const express = require('express')
const zod = require('zod')
const router = express.Router();
const { User } = require('../models/todo')
const { Task } = require('../models/todo')
const { PASSWORD } = require("../password")
const jwt = require('jsonwebtoken')
const { authMiddleware } = require('../authentication')


const zodCheckUsers = zod.object({
    username: zod.string(),
    mail: zod.string().email(),
    password: zod.string()
})


// ------------------------sign up --------------------------
router.post('/signup', async(req, res) => {
        const { success } = zodCheckUsers.safeParse(req.body);

        if (!success) {
            res.status(401).json({ mssg: "error in the input types " })
        }

        const userCheck = await User.findOne({
            mail: req.body.mail
        })

        if (userCheck) {
            res.status(402).json({ mssg: 'email already exist ' })
        }

        const newUser = await User.create({
            username: req.body.username,
            mail: req.body.mail,
            password: req.body.password
        })
        const userId = newUser._id

        const task = await Task.create({
            userId: userId,
            task: "no tasks",
            description: "no task assined",
            isCompleted: true,
            delete: true
        })


        const token = jwt.sign({
            userId
        }, PASSWORD)

        res.json({
            mssg: "user created succesfully",
            token: token
        })



    })
    //--------------------------SignIN----------------------------------------------

const zodCheckSignIn = zod.object({
    mail: zod.string(),
    password: zod.string()
})

router.post('/signin', async(req, res) => {
    const { success } = zodCheckSignIn.safeParse(req.body);
    //console.log("sigin called");
    if (!success) {
        return res.status(401).json({ mssg: 'error in the input values or user does not exist' })
    }
    //console.log("sigin middle");

    const user = await User.findOne({
        mail: req.body.mail,
        password: req.body.password
    })

    //console.log("signin before jwt");
    if (user) {
        const userId = user._id

        const token = jwt.sign({
            userId
        }, PASSWORD)

        res.json({ token: token });
        return;
    }

    res.status(404).json({ err: " error in the login / user notfound  " })
})

//--------------------------Update--------------------------------------------

const zodUpdate = zod.object({
    username: zod.string(),
    mail: zod.string().email(),
    password: zod.string()
})

router.put('/update', authMiddleware, async(req, res) => {
    const updateUser = zodUpdate.safeParse(req.body);
    console.log("after check")
    if (!updateUser) {
        return res.json({ mssg: "errror in input entered / invalid inputs" })
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body) // (filter , update) finduser based on id and update the body of the user
        res.status(200).json({ mssg: "updated successfully" })

    } catch (error) {
        res.status(500).json({ mssg: 'error in updating the user' })
    }
})

module.exports = router;