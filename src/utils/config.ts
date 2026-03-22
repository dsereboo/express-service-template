import * as dotenv from "dotenv"

dotenv.config()

export const config={
    system:{
      port: process.env.PORT,
    },
    authentication:{
      secretKey: process.env.SERVER_SECERET,
    },
    database:{
        url: process.env.DATABASE_URL
    },
    logging:{
      logFolderPath: process.env.LOGFOLDERPATH,
      logFileName: process.env.LOGFILENAME,
      seqServer: process.env.SEQ_SERVER_URL,
      seqKey: process.env.SEQ_API_KEY
    }
} as const