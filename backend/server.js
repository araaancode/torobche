// load env vars
require("dotenv").config();


// libs
const express = require("express")
const colors = require("colors")
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

// init express
const app = express()

// connect to database
require("./config/db")()

// middlewares
app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site" }
}));

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'تعداد درخواست‌ها بیش از حد مجاز است'
    }
});
app.use(limiter);


// routes
// app.use('/api/auth', require("./routes/auth"))
app.use('/api/templates', require("./routes/templates"))
app.use('/api/menus', require("./routes/menus"))
app.use('/api/foods', require("./routes/foods"))
app.use('/api/visit-templates', require("./routes/visitTemplates"))
app.use('/api/visit-cards', require("./routes/visitCards"))
app.use('/api/business-cards', require("./routes/bussinessCards"))
app.use('/api/business-templates', require("./routes/businessTemplates"))
app.use('/api/auth', require("./routes/auth"))


app.use('/api/resume-templates', require("./routes/resumeTemplates"));
app.use('/api/resumes', require("./routes/resumes"));
app.use('/api/r', require("./routes/resumes"));



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})