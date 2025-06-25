import express,{Request, Router} from "express"
import CourseController from "../../controller/insitute or admin/course/courseController"
import Middleware from "../../middleware/middleware"
import asyncErrorHandler from "../../services/errorHandeling"


//THIS is to store locally
// import { multer,storage } from './../../middleware/multerMiddleware'
// const upload= multer({storage:storage})


//this is to store in cloud
import {cloudinary,storage} from './../../services/cloudinaryConfig'
import multer from "multer"

const upload=multer({storage:storage,
    fileFilter:(req:Request,file:Express.Multer.File,cb)=>{
        const allowedFileTypes=['image/png','image/jpg','image/jpeg']
       if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("only image support"))
    }
}
})
const router:Router =express.Router()

router.route("/").post(Middleware.isLoggedIn, upload.single('courseThumbnail'),asyncErrorHandler(CourseController.createCourse)).post(Middleware.isLoggedIn,asyncErrorHandler(CourseController.getAllCourse))

export default router