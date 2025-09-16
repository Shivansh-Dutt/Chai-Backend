import 'dotenv/config';
import connectDB from "./db/index.js";


connectDB()
.then()
.catch((err)=>{
    console.log("MONGO db connection failed !!!")
})






































// const app = express()

// // immediately invoked function
// ; (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log("Databse Connected")
//         app.on("error",(error) => {
//             console.log("Error: ",error)
//             throw error
//         })

//         app.listen(process.env.PORT,() => {
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
        
//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw error
//     }
// })()