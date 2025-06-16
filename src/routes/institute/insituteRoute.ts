import express,{Router} from "express"
import { register } from "module"
import InstituteController from "../../controller/insitute or admin/instituteController"
const router:Router =express.Router()

router.route("/").post(InstituteController.createInstitute)


export default router