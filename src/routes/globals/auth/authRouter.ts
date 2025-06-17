import express,{Router} from "express"
import { register } from "module"
import AuthController from "../../../controller/globals/auth/authcontroller"
import asyncErrorHandler from "../../../services/errorHandeling"
const router:Router =express.Router()

router.route("/register").post(asyncErrorHandler(AuthController.registerUser))
router.route("/login").post(asyncErrorHandler( AuthController.loginUser))

export default router