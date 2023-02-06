import express, { Request, Response } from 'express';
import cors from "cors"
import { UserController } from './controller/UserController';

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

const userControler = new UserController()

app.get("/ping", (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/users", userControler.getUsers)

app.post("/users", userControler.createUser)

app.put("/users/:id", userControler.editUser)

app.delete("/users/:id", userControler.deleteUser)