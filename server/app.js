require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./db/models/index')

const threadRouter = require('./routes/post');
const userRouter = require('./routes/user');

const port = process.env.PORT || 7000

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api/thread', threadRouter);
app.use('/api/user', userRouter);

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})