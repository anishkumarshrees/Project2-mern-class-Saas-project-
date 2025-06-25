import express,{Request, Router} from "express"
import CourseController from "../../controller/insitute or admin/course/courseController"
import Middleware from "../../middleware/middleware"
import asyncErrorHandler from "../../services/errorHandeling"
import CategoryController from "../../controller/insitute or admin/category/categoryController"

const router:Router=express.Router()

router.route("/").post(Middleware.isLoggedIn,asyncErrorHandler(CategoryController.createCategory),asyncErrorHandler(CategoryController.getCategory))


export default router