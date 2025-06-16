
import { Sequelize } from "sequelize-typescript"
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize({
    database : process.env.DB_NAME, //database ko name
    username : process.env.DB_USERNAME, // databasw ko username, by default root hunxa
    password : process.env.DB_PASSWORD, // database ko pw, by default khali hunxa
    host : process.env.DB_HOST, // database ko location
    dialect : "mysql", // kun database use garna aateko vanne kura
    port: Number(process.env.DB_PORT), //default port number 3306 hunxa
    models:[__dirname + '/models']  //current loactiaon +'./models'
})

sequelize.authenticate()
.then(()=>{
    console.log("connect vayo")
})
.catch((error)=>{
    console.log(error)
})

sequelize.sync({alter:true})
.then(()=>{
    console.log("migrated successfull vayo")
})


export default sequelize