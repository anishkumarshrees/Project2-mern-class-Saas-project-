import express,{Router} from "express"

import InstituteController from "../../controller/insitute or admin/instituteController"
import Middleware from "../../middleware/middleware"
import asyncErrorHandler from "../../services/errorHandeling"
import TeacherController from "../../controller/insitute or admin/teacher/teacherController"
const router:Router =express.Router()

router.route("/").post(asyncErrorHandler(Middleware.isLoggedIn),asyncErrorHandler(TeacherController.createTeacher))


export default router