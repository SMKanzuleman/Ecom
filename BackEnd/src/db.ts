import mongoose from "mongoose";


export const ConnectDB = async (MongoURL: string):Promise<void> => {
    try {
        const conn = await mongoose.connect(MongoURL)
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("There is some error while connecting Database", error)
    }

}