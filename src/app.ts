import express from 'express'
const app = express()
import authRoute from "./routes/globals/auth/authRouter"
import institeteROute from "./routes/institute/insituteRoute"
import teacherRoute from "./routes/teacher/teacherRoutes"
import CourseController from './controller/insitute or admin/course/courseController'
import courseRoute from "./routes/course/courseRoute"
app.use(express.json())

app.use("/", authRoute)
app.use("/institute",institeteROute)
app.use("/course",courseRoute)
app.use("/teacher",teacherRoute)

export default app