'use strict'

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = Router();

process.env.SECRET_KEY = 'secret'

router.post("/register", async(req, res, next) => {

        const {body} = req;
        const userData = new User(body);

        await User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {             
                    userData.password = hash
                    userData.save()
                    //User.create(userData)              
                        .then(user => {
                            res.json({ status: user.email + ' has been registered!' })
                            res.statusCode = 201;
                        })
                        .catch(err => {
                            res.send('error:' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error:' + err)
        }) 
})


router.post('/login', async (req, res) => {

        await User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(user) {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        //userId: user.userId,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    }
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.statusCode = 201;
                    res.send(token)                  
                } else {
                    res.json({error: "Invalid password! Please try again"})
                }
            } else {
                res.json({error: "User does not exist!"})
            }
        })
        .catch(err => {
            res.send("error" + err)
        })
})  


router.get('/profile', async(req, res, next) => {
    const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    await User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user) 
            } else {
                res.send("User does not exist!")
            }
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

router.get('/admin/users', async(req,res,next) => {
    const dbRes = await User.find()
    res.send(dbRes);
    console.log(dbRes)
})

module.exports = router;




 //req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');


        // await userData.save();
        // res.statusCode = 201;
        // res.send({
        //     succeed: true,
        // });