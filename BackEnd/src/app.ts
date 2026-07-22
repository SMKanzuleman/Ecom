import express from "express"
import morgan from "morgan"
import { Config } from "./config/app.config"
import { ConnectDB } from './db';
import AuthRouter from "./auth/auth.router";
import cookieParser from "cookie-parser";
import { ProductRouter } from "./products/product.router";


const app=express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/auth/",AuthRouter)
app.use("/products", ProductRouter)

app.get("/" , (req,res)=>{
    return res.send(`<a href="/auth/google">Account with Google <a/>`)
})


app.listen(Config.Port,()=>{
    ConnectDB(Config.MongoUrl)
    console.log(`App is live at http://localhost:${Config.Port}`);
})