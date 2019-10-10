'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const yamljs = require('yamljs');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const menuRouter = require('./routers/Menus');
const orderRouter = require('./routers/Orders');
const userRouter = require('./routers/Users');
const adminRouter = require('./routers/Admins');
require('dotenv').config()

const app = express();
// const issue2options = {
//     origin: true,
//     methods: ["POST","GET","PUT","DELETE","OPTIONS"],
//   };
app.use(cors());
//app.options('*', cors());

// app.all("*", function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,x-access-token"
//     );
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     if (req.method == "OPTIONS") res.sendStatus(200);
//     /*让options请求快速返回*/ else next();
//   });


mongoose.connect(
    `${process.env.MONGO_DB_CLOUD_UNAME_PWD}`,
    { useNewUrlParser: true, useUnifiedTopology: true });
    //'mongodb://localhost:27017/test',  { useNewUrlParser: true, useUnifiedTopology: true });
    
    
    

const openapiDoc = yamljs.load('./openapi.yaml');

app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiDoc));
app.use(bodyParser.json());
app.use(menuRouter);
app.use(orderRouter);
app.use(userRouter);
app.use(adminRouter);

app.listen(4000, () => console.log("Listening on port 4000"));

