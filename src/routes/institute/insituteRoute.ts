import express,{Router} from "express"
import { register } from "module"
import InstituteController from "../../controller/insitute or admin/instituteController"
import Middleware from "../../middleware/middleware"
import asyncErrorHandler from "../../services/errorHandeling"
const router:Router =express.Router()

router.route("/").post(asyncErrorHandler(Middleware.isLoggedIn),asyncErrorHandler( InstituteController.createInstitute),asyncErrorHandler(InstituteController.createTeacherTable),asyncErrorHandler(InstituteController.createStudentTable),asyncErrorHandler(InstituteController.createCourseTable),asyncErrorHandler(InstituteController.createCategoryTable))


export default router