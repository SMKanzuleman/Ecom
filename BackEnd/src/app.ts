import express from "express"
import morgan from "morgan"
import { Config } from "./config/app.config"
import { ConnectDB } from './db';
import AuthRouter from "./auth/auth.router";
import cookieParser from "cookie-parser";


const app=express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api/",AuthRouter)


app.listen(Config.Port,()=>{
    ConnectDB(Config.MongoUrl)
    console.log(`App is live at http://localhost:${Config.Port}`);
})