const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

const router = Router();

process.env.SECRET_KEY = 'secret'

router.post("/admin/register", async(req, res, next) => {

    const {body} = req;
    const adminData = new Admin(body);
    console.log(req.body)
    await Admin.findOne({
        email: req.body.email
    })
    .then(admin => {
        if (!admin) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {             
                adminData.password = hash
                adminData.save()
                //Admin.create(adminData)              
                    .then(admin => {
                        res.json({ status: 'Administrator ' + admin.email + ' has been registered!' })
                        res.statusCode = 201;
                    })
                    .catch(err => {
                        res.send('error:' + err)
                    })
            })
        } else {
            res.json({ error: 'Admin already exists' })
        }
    })
    .catch(err => {
        res.send('error:' + err)
    }) 
})


router.post('/admin/login', async (req, res) => {

    await Admin.findOne({
        email: req.body.email
    })
    .then(admin => {
        if(admin) {
            if(bcrypt.compareSync(req.body.password, admin.password)) {
                const payload = {
                    _id: admin._id,
                    first_name: admin.first_name,
                    last_name: admin.last_name,
                    email: admin.email
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
            res.json({error: "Admin does not exist!"})
        }
    })
    .catch(err => {
        res.send("error" + err)
    })
})  


router.get('/admin/profile', async(req, res, next) => {
    const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    await Admin.findOne({
        _id: decoded._id
    })
        .then(admin => {
            if (admin) {
                res.json(admin) 
            } else {
                res.send("Admin does not exist!")
            }
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

module.exports = router;