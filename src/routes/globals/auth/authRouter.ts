import express,{Router} from "express"
import { register } from "module"
import AuthController from "../../../controller/globals/auth/authcontroller"

const router:Router =express.Router()

router.route("/register").post(AuthController.registerUser)

export default router