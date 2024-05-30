const express = require('express')
const app = express()
const connectToDatabase = require('./config/mongoDb')
const cors = require('cors');
app.use(express.json());


app.use(cors());

const allRoutes = require('./routes/allRoutes')

app.use('/api',allRoutes)


app.listen( 5000 , ()=> console.log('server started running') )