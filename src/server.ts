import "reflect-metadata"
import express, { NextFunction, Response, Request } from "express"
import cors from "cors"
import "express-async-errors"

import { router } from "./routes"

import "./database"
import { ErroHandler } from "./util/ErrorHandler"

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.use((err: ErroHandler, request: Request, response: Response, next: NextFunction) => {
    
  if(err instanceof ErroHandler) {
    return response.status(err.errorStatus).json({
      error: err.errorMessage
    })
  }
  
  return response.status(500).json({
    error: "Error",
    message: "Internal Server Error"
  })
})


const PORT = process.env.PORT || 3500
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))