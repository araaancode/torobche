const mongoose=require("mongoose")
const colors=require("colors")

const connection=async()=>{
    try {
        const result=await mongoose.connect("mongodb://127.0.0.1:27017/torobchedb")
        console.log('Database conncted...'.bgGreen)
    } catch (error) {
        console.log('database connection is not established...'.red)
        console.log(error)
    }
}


module.exports = connection