import express, { response } from "express"

const app = express()

app.get("/", (request, response) => response.send("Ola Leandro"))

app.post("/rotapost", (request, response) => response.send("Rota post"))

app.listen(3000, () => console.log(`Server running on http://localhost:3000`))