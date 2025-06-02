import express,{Router} from "express"
import { register } from "module"
import { registerUser } from "../../../controller/globals/auth/authcontroller"
const router:Router =express.Router()

router.route("/register").post(registerUser)

export default express