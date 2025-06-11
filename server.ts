import app from "./src/app";
import {config} from "dotenv";
import "./src/database/connection"
config()

function startServer(){
    const port= process.env.PORT || 3000;
    app.listen(port,function(){
        console.log(`Server has started at port ${port}`)
    })
}

startServer()
