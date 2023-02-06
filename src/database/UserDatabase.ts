import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public async findUsers(q:string|undefined){
        let UserDB
        if(q){
            const result: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where("name", "LIKE", `%${q}%`)
            UserDB = result
        } else{
            const result: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
            UserDB = result
        }
        return UserDB
    }
    public async findUserById(id:string){
        const [UserDB]: UserDB[] | undefined[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({id})
        return UserDB
    }
    public async insertUser(newUserDB:UserDB){
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUserDB)
    }
    public async editUserById(id:string, updateUserDB: UserDB){
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).update(updateUserDB).where({id})
    }
    public async deleteUserById(id:string){
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).del().where({id})
    }
}