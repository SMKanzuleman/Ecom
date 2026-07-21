import dotenv from "dotenv"
dotenv.config()

type Config ={
    Port:number
    MongoUrl:string
}

export const Config:Config = {
    Port: Number(process.env.PORT) || 3000,
    MongoUrl: process.env.MONGOURL || "testing"
}

