const express = require("express")
const cors=require("cors")
const app = express()

require('dotenv').config()
app.use(cors({
    origin:["https://taskify-mysql-uditi.onrender.com"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const postsRouter = require('./routes/posts.router')
const authRouter = require('./routes/auth.router')

app.use("/api/v1/posts", postsRouter)
app.use("/api/v1/auth", authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})