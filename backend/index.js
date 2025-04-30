const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const formROutes= require("./routes/userRouter")
const app = express()
dotenv.config()
const {connectDB} = require("./config/db")
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI
// Middleware

app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.get("/",(req,res)=>{
    res.send("Hello from server")
})
app.use("/",formROutes.userRouter)

connectDB().
then(()=>{
    console.log("MongoDB connected")

    app.listen(PORT)
   
}
    
)
.catch((err)=>{
    console.log(err)
})
module.exports = app