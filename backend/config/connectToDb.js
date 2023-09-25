import chalk from "chalk";
import mongoose from "mongoose";
import { systemLogs } from "../utils/Logger";

const connectToDB = async() => {
    try{
        const connectionParams = {
            dbName:process.env.DB_NAME,
        }
        const connect = await mongoose.connect(
            process.env.MONGO_URI,
            connectionParams
        )

        console.log(
            `${chalk.blue.bold(`MongoDb Connected:${connect.connection.host}`)}`
        )

        systemLogs.info(`MongoDb Connected:${connect.connection.host}`)
    }catch(error){
        console.log(`${chalk.red.bold(`Error:${error.message}`)}`)
        process.exit(1)
    }
}

export default connectToDB