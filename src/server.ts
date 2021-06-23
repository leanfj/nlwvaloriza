import "reflect-metadata"
import express, { response } from "express"
import "./database"

const app = express()

app.listen(3000, () => console.log(`Server running on http://localhost:3000`))