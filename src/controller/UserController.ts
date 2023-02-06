import { Request, Response } from "express"
import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined
            const userDatabase = new UserDatabase()
            const UsersDB = await userDatabase.findUsers(q)
            const users: User[] = UsersDB.map((userDB) => new User(
                userDB.id,
                userDB.name,
                userDB.email
            ))
            res.status(200).send(users)
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
    }
    public createUser = async (req: Request, res: Response) => {
        try {
            const { id, name, email } = req.body
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'email' deve ser string")
            }
            const userDatabase = new UserDatabase()
            const userDBExist = await userDatabase.findUserById(id)
            if (userDBExist) {
                res.status(400)
                throw new Error("'id' já existe")
            }
            const newUser = new User(
                id,
                name,
                email
            )
            const newUserDB: UserDB = {
                id: newUser.getId(),
                name: newUser.getName(),
                email: newUser.getEmail()
            }
            await userDatabase.insertUser(newUserDB)
            res.status(200).send(newUser)
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
    }
    public editUser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const newId = req.body.id
            const newName = req.body.name
            const newEmail = req.body.email
            if (!newId && !newName && !newEmail) {
                res.status(400)
                throw new Error("'id', 'name', 'email' precisam estar corretos!")
            }
            if (newId !== undefined) {
                if (typeof newId !== "string") {
                    res.status(400)
                    throw new Error("'id' precisa ser string")
                }
            }
            if (newName !== undefined) {
                if (typeof newName !== "string") {
                    res.status(400)
                    throw new Error("'name' precisa ser string")
                }
            }
            if (newEmail !== undefined) {
                if (typeof newEmail !== "string") {
                    res.status(400)
                    throw new Error("'email' precisa ser string")
                }
            }
            const userDatabase = new UserDatabase()
            const userDBExist = await userDatabase.findUserById(id)
            if (!userDBExist) {
                res.status(404)
                throw new Error("'id' não encontrado")
            }
            const userToEdit = new User(
                newId,
                newName,
                newEmail
            )
            const updateUserDB: UserDB = {
                id: userToEdit.getId() || userDBExist.id,
                name: userToEdit.getName() || userDBExist.name,
                email: userToEdit.getEmail() || userDBExist.email
            }
            await userDatabase.editUserById(id, updateUserDB)
            res.status(200).send("User atualizado com sucesso!")
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
    }
    public deleteUser = async (req: Request, res: Response) => {
        try {
            const idToDelete = req.params.id
            const userDatabase = new UserDatabase()
            const userToDelete = await userDatabase.findUserById(idToDelete)
            if (!userToDelete) {
                res.status(404)
                throw new Error("Usuário nâo encontrado!")
            } else{
                await userDatabase.deleteUserById(idToDelete)
                res.status(200).send("Usuário deletado com sucesso!")
            }

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
    }
}