import express from "express"
import cors from "cors"
import helmet from "helmet";
import { morganMiddleware } from "./utils/morgan";
import { v1Router } from "./shared/router";
import { limiter } from "./utils/rate-limiter";

const app = express()
const PORT = 8080;

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morganMiddleware)
app.use(limiter)

app.use("/api/v1", v1Router)

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})