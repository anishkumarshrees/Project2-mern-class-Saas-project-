import express from 'express'
const app = express()
import authRoute from "./routes/globals/auth/authRouter"


app.use(express.json())

app.use("/", authRoute)

export default app