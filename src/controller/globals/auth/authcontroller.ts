


/*
first maa k k chainxa sochera lekhni ani one by one code garni
Register/Signup
incoming datas --> username, email ,password
processing/checking --> email-valid, compulsory data hunu paryo
db--> table--> query --> table maa CRUD ko kura herni

login
logout
forget password
reset password/ otp


*/

import {Request, Response} from "express"
import user from "../../../database/models/usermodel"
//functional style we use this style in past projects
const registerUser = async (req:Request,res:Response)=>{
    const {username , email, password} = req.body
    if(!username || !password || !email){
        res.status(400).json({
            message : "please provide all data"
        })
    }
    else{
        // insert into user tables
       await user.create({
            username :username,
            password:password,
            email:email
        })
        res.status(200).json({
            messgage:"user register successfully"
        })
    }

}

export {registerUser}







// exports.loginUser = ()=>{

// }
//oop style but this is good for good programing
// class AuthController{
//     static async registerUser(){

//     }
    
// }


// module.exports = AuthController
