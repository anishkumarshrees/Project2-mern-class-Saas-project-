


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
import jwt  from "jsonwebtoken"

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
//flow for login
//email/username, password(basic)
//email, password -- data accept --> validation-->
//first check email exist or not (verify) --> yes --> password check --> correct --> token generation(jsonwebtoken)



//google login, fb, github(outh)
//email login (SSO)


class AuthController{
    static async registerUser(req:Request,res:Response){
         {
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
 
  static  async loginUser (req:Request,res:Response){
            const {email,password}=req.body
            if(!email || !password){
                res.status(400).json({
                    message:"please provide email and passowrd"
                })
            
                return 
            }

            //check if email exist or not in our data
      const data =  await User.findAll({
            where:{
                email 
            }
        })
        if(data.length==0){
                res.status(404).json({
                    message:"not register"
                })
        }
        else{
         const isPasswordMatch =   bcrypt.compareSync(password,data[0].password)
         //password match vayo ki nai check   
         if(isPasswordMatch){
                //milyo vaney login vayo token generation le
              const token= jwt.sign({
                id:data[0].id
              },"thisissecret",{
                expiresIn:"90d"
              })
                res.json({
                    token:token
                })
            }
            else{
                res.status(400).json({
                    message:"password or email is not match"
                })
            }
        }
                }
    
    
}


export  default AuthController
