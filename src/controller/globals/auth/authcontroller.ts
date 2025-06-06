


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

import User from "../../../database/models/usermodel"
import bcrypt from 'bcrypt'

//functional style we use this style in past projects
// const registerUser = async (req:Request,res:Response)=>{
//     const {username , email, password} = req.body
//     if(!username || !password || !email){
//         res.status(400).json({
//             message : "please provide all data"
//         })
//     }
//     else{
//         // insert into user tables
//        await user.create({
//             username :username,
//             password:password,
//             email:email
//         })
//         res.status(200).json({
//             messgage:"user register successfully"
//         })
//     }

// }

// export {registerUser}







// exports.loginUser = ()=>{

// }
//oop style but this is good for good programing
class AuthController{
    static registerUser(){
        async (req:Request,res:Response)=>{
            if(req.body==undefined){
                res.status(400).json({
                    message : "please provide all data"
                })
                return
            }
    const {username , email, password} = req.body
    if(!username || !password || !email){
        res.status(400).json({
            message : "please provide all data"
        })
    }
    else{
        // insert into user tables
       await User.create({
            username :username,
            password:bcrypt.hashSync(password,12),
            // password:password,
            email:email
        })
        res.status(200).json({
            messgage:"user register successfully"
        })
    }
    
    
}


    }
 
    async loginUser (req:Request,res:Response){
            const {email,password}=req.body
            if(!email || !password){
                res.status(400).json({
                    message:"please provide email and passowrd"
                })
            }
               return 

     
      const data =  await User.findAll({
            where:{
                email 
            }
        })
        if(data.length==0){
                res.status(404).json({
                    message:"please give data"
                })
        }
        else{
            bcrypt.compareSync(password)
        }
                }
    
    
}


export default AuthController
