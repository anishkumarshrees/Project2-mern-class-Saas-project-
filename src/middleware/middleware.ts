import {Request,Response} from "express"
import Jwt  from "jsonwebtoken"


//type maa add garna paryo vani talako steps garni
// interface Extend extends Request{
//     user:{
//         name:string
//     }
// }


class Middleware{
    // hello(req:Extend,res:Response)
  static  isLoggedIn(req:Request,res:Response){
    //steps 
    //check if login or not
    //token accept
    //verify token it is legit or not
    //headers maa herxam token
    // req.user.name esto bahiri kura extend garna lai mathi ko step follow garni
  const token=  req.headers.authorization
  if(!token){
    res.status(401).json({
        message:"please provide token"
    })
    return
  }
  //verify garni steps
  Jwt.verify(token,)

    }
}

export default Middleware