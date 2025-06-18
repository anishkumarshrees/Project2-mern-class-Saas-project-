//multer configuration

import { Request } from "express";
import multer from "multer";

  multer.diskStorage({
    //location for incoming files
    //cb=call back
    destination:function(req:Request,file:Express.Multer.File,cb:any){
            //cb(error,success)
        cb(null,'./src/storage')
    },
    //filename for files coming from destination
    filename:function(req:Request,file:Express.Multer.File,cb:any){
        cb(null,file.originalname+"_"+Date.now())
        // cb(null,file.originalname+"_"+req.user.id) user ko id ko name rakhna paryo vani yo code
        
    }
})
export default multer