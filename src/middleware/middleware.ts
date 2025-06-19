import {NextFunction, Request,Response} from "express"
import Jwt  from "jsonwebtoken"
import User from "../database/models/usermodel"
import { IExtendedRequest } from "./type"


//type maa add garna paryo vani talako steps garni
// interface Extend extends Request{
//     user:{
//         name:string
//     }
// }



class Middleware{
    // hello(req:Extend,res:Response)
    //route maa next steps garna ko lagi next function halnu parxa
  static async isLoggedIn(req:IExtendedRequest,res:Response,next:NextFunction){
    //steps 
    //check if login or not
    //token accept
    //verify token it is legit or not
    //headers maa herxam token
    // req.user.name esto bahiri kura extend garna lai mathi ko step follow garni
  const  token=  req.headers.authorization
  if(!token){
    res.status(401).json({
        message:"please provide token"
    })
    return
  }
  //verify garni steps
  Jwt.verify(token,'thisissecret',async(erroraayo,resultaayo:any)=>{
    if(erroraayo){
        res.status(401).json({
            message:"invalid token"
        })
    }else{
        //token verify garni
        // console.log(resultaayo,'successfully logged in')
        // const userData=await User.findByPk(resultaayo.id,{
        //     attributes:['id','currentInstituteNumber']
        // })
        const userData=await User.findByPk(resultaayo.id,{
            attributes:['id','currentInstituteNumber']
        })
            
        
        if(!userData){
         return  res.status(403).json({
                message:"user not found"
            })

        }
        else{
            req.user = userData.toJSON()
            next()
        }

    }
})


    }
}

export default Middleware