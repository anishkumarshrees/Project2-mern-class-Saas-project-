import express,{Router} from "express"
import { register } from "module"
import InstituteController from "../../controller/insitute or admin/instituteController"
import Middleware from "../../middleware/middleware"
const router:Router =express.Router()

router.route("/").post(Middleware.isLoggedIn, InstituteController.createInstitute,InstituteController.createTeacherTable,InstituteController.createCourseTable)


export default router