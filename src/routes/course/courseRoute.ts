import express,{Router} from "express"
import CourseController from "../../controller/insitute or admin/course/courseController"
import Middleware from "../../middleware/middleware"
import asyncErrorHandler from "../../services/errorHandeling"
const router:Router =express.Router()

router.route("/").post(Middleware.isLoggedIn,asyncErrorHandler(CourseController.createCourse))
router.route("/course").get(Middleware.isLoggedIn,asyncErrorHandler(CourseController.getAllCourse))
export default router