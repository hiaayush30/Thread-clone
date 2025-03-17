require('dotenv').config();
const cors=require('cors');
const path=require('node:path')
const express = require("express");
const { connectToDatabase } = require('./config/db');
const cookieParser = require('cookie-parser');
const { userRouter } = require('./routes/user');
const { postRouter } = require('./routes/post');
const { commentRouter } = require('./routes/comment');
const app = express();

app.use(cors({
    origin:process.env.FE_DOMAIN,
    credentials:true,
    allowedHeaders:['Authorization','Content-Type']
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.get('/api/health',(req,res)=>{
    res.status(200).json({
        message:'server running'
    })
})

app.use('/api/user',userRouter);
app.use('/api/post',postRouter);
app.use('/api/comment',commentRouter);

connectToDatabase()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('server running on port ' + process.env.PORT);
        })
    })
