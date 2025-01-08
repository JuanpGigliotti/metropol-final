import userDTO from "../dto/user.dto.js";
import UserRepository from "../repository/user.repository.js";

import {createHash, compareHash} from "../utils/util.js";

class userService{
    async registerUser(userData){
        const existUser = await UserRepository.getUserByEmail(userData.email);

        if(existUser) throw new Error("User already exists");
        
        userData.password = createHash(userData.password);
        return await UserRepository.createUser(userData);
    }

    async loginUser(email, password){
       const user = await UserRepository.getUserByEmail(email);
       if (!user || !compareHash(password, user)) throw new Error("wrong credentials");
       return user;
    }

    async generateDTO(user){
        const finalUser = new userDTO(user);
        return finalUser;
    }
}

export default new userService()