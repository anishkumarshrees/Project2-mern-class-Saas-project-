import express from 'express'
const app = express()
import authRoute from "./routes/globals/auth/authRouter"
import institeteROute from "./routes/institute/insituteRoute"

app.use(express.json())

app.use("/", authRoute)
app.use("/institute",institeteROute)

export default app