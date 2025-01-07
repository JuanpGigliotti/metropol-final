import userModel from './models/user.model.js';

class userDao{
    async findById(id){
        return await userModel.findById(id);
    }

    async findOne(query){
        return await userModel.findOne(query);
    }

    async save(userData) {
        const user = new userModel(userData);
        return await user.save();
    }
}

export default userDao();
