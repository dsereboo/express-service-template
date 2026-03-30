import express from "express"
import cors from "cors"
import helmet from "helmet";
import { v1Router } from "./routers/v1";
import { limiter } from "./middleware/rate-limiter";
import { notFoundMiddleware } from "./middleware/not-found";
import { authMiddleware } from "./middleware/auth";
import { config } from "./utils/config";
import { morganMiddleware } from "./middleware/morgan";
import { healthCheckHandler } from "./utils/health-check";

const app = express()
const PORT = config.system.port;

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morganMiddleware)
app.use(limiter)
app.use("/health", healthCheckHandler)
app.use(authMiddleware)
app.use("/api/v1", v1Router)
app.use(notFoundMiddleware)


app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})