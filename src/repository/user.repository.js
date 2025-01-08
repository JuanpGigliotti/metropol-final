import userDao from '../dao/user.dao.js';

class UserRepository{
    async createUser(userData){
        return await userDao.save(userData);
    }

    async getUserByEmail(email){
        return await userDao.findOne({email: email});
    }

    async getUserById(id){
        return await userDao.findById(id);
    }
}

export default new UserRepository();