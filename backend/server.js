// load env vars
require("dotenv")

// libs
const express = require("express")
const colors = require("colors")

// init express
const app = express()

// connect to database
require("./config/db")()


// middlewares
app.use(express.json())

// routes
app.use('/api/auth', require("./routes/auth"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})