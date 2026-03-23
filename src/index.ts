import express from "express"
import cors from "cors"
import helmet from "helmet";
import { v1Router } from "./shared/router";
import { limiter } from "./middleware/rate-limiter";
import { notFoundMiddleware } from "./middleware/not-found";
import { authMiddleware } from "./middleware/auth";
import { config } from "./utils/config";
import { morganMiddleware } from "./middleware/morgan";

const app = express()
const PORT = config.system.port;

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morganMiddleware)
app.use(limiter)
app.use("/api/v1", v1Router)
app.use(authMiddleware)
app.use(notFoundMiddleware)

//add health check endp

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})