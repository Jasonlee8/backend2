'use strict'

const { Router } = require('express');
const Menu = require('../models/Menu');

const router = Router();

router.get('/menu', async (req, res, next) => {
    const dbRes = await Menu.find();
    res.send(dbRes);  
});


router.put("/menuquantity", async (req, res, next) => {  
    try {
        
        const iTitle = req.body.itemTitle;
        const iQuantity = req.body.itemQuantity
 
        const result = await Menu.findOne({ 
            $and: [{title: iTitle}, 
                {quantity: {"$gte": iQuantity}}
            ]
        })

        // const result = await Menu.findOne({"title": iTitle})
        console.log(result)
        if(result === null) {
            res.statusCode = 404;
            res.send({
                succeed: false,
            })
        } else {
            Object.assign(result, await Menu.updateOne(
                {title: iTitle},
                {$inc: {quantity: - iQuantity }}
            ))
            res.statusCode = 201;
            res.send({
                succeed: true,
            });
        }
    } catch (e) {
        next();
    }
    //req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
})

router.get('/admin/products', async (req, res, next) => {
    const dbRes = await Menu.find();
    res.send(dbRes);
})

module.exports = router;




// const { body } = req;
// const result = await Menu.findOne({"title": req.body.itemTitle})

// if(result){
//     Object.assign(result, body);
//     const menu = new Menu(result);
//     await menu.save();
//     res.send({
//         succeed
//     })
// }