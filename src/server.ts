import "reflect-metadata"
import express, { response } from "express"

import { router } from "./routes"

import "./database"

const app = express()
app.use(express.json())
app.use(router)

const PORT = 3500

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))