'use strict'

const { Router } = require('express');
const Order = require('../models/Order');
//const Register = require('./models/Register')

const router = Router();

router.get('/', function(req, res){
    res.sendFile(__dirname+'/order'); // change the path to your index.html
});

// router.get('/cart', async (req, res, next) => {

//     const dbRes = await Order.find({
//         email: req.body.email
//     })
//     res.statusCode = 201;
//     res.send(dbRes);
// });

router.post("/order", async(req, res, next) => {
    try {
        const {body} = req;
        const order = new Order(body);
        const dbRes = await order.save();
        res.statusCode = 201;       
        res.send({
            succeed: true,
            _id: dbRes._id
        })
    } catch (e) {
        next();
        console.log(e)
    }
    //req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
})

router.get('/orderid', async (req, res, next) => {
    const dbRes = await Order.aggregate([
        {
            $group: {
                _id: null,
                maxOrderId: {$max: "$orderId"}
            }
        }
    ]);
    res.send(dbRes);  
});


// router.put("/orderquantity", (req, res, next) => {
//     try {
//         // const {id} = req.params;
//         Menu.updateOne(
//             {"title": req.body.itemTitle},
//             {$inc: {"quantity" : - 4 }}
//             //{$inc: {'quantity': - req.body.quantity}}
//         )  
//         console.log(req.body)
//         res.statusCode = 201;
//         res.send({
//             succeed: true,
//         });
//     } catch (e) {
//         next();
//     }
//     //req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
// })


router.post('/cart', async (req, res, next) => {

    const dbRes = await Order.find({
        email: req.body.email
    })
    res.statusCode = 201;
    res.send(dbRes);
});

router.get('/cart', async (req, res, next) => {

    const dbRes = await Order.find({
        email: req.body.email
    })
    res.statusCode = 201;
    res.send(dbRes);
});

module.exports = router;



// if(result) {
//     Object.assign(result, body);
//     const order = new Order(result);
//     await order.save();
// }

// const order = new Order.update(
//     {_id: new mongoose.Types.ObjectId(req.params._id)},
//     {status: "Item is ready"},
// )

// mongo.connect(url, async(err, db) => {
//     if (err) throw err;
//     await db.collection('orders').updateOne(
//         {'email': "man@gmail.com"},
//         {'status': "Item is ready"},
//         function(err, res) {
//             if (err) throw err;
//             db.close();
//         }
//     )
// })
// console.log(orderUpdate);


    // const {id} = req.params;
    // const {body} = req;
    // const order = new Order(body);
    // const dbRes = await order.save();
    // Order(body).updateOne(
    //     {"email": "bill@gmail.com"},
    //     // {_id: new mongoose.Types.ObjectId(id)},
    //     {"status": "Item is ready"},
    //     {upsert: true}
    // ).setTimeout(30000);