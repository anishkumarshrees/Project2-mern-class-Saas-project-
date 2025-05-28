import app from "./src/app";
import { envconfig } from "./src/config/config";

function startserver(){
    const port= envconfig.portNumber
    app.listen(port,function(){
        console.log("server started on port "+port)
    })
}

startserver();
