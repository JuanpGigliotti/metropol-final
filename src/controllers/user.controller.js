import userService from "../services/user.service.js";
import jwt from 'jsonwebtoken';

class UserController{
    async register (req, res){
        const {first_name, last_name, email, age, password} = req.body;
        try{
            const newUser = await userService.registerUser({first_name, last_name, email, age, password});

            const token = jwt.sign({
                user: `${newUser.first_name} ${newUser.last_name}`,
                email: newUser.email,
                role: newUser.role
            }, "process.env.JWT_SECRET", {expiresIn:"1h"});
            
            res.cookie("metroToken", token, {maxAge: 3600000, httpOnly: true});

            res.redirect("/api/sessions/current");
        } catch(error){
            res.status(500).send("server internal error");
        }
    }

    async login(req, res){
        const {email, password} = req.body;
        try{
            const user = await userService.loginUser(email, password);

            const token = jwt.sign({
                user: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role
            }, "process.env.JWT_SECRET", {expiresIn:"1h"});
            
            res.cookie("metroToken", token, {maxAge: 3600000, httpOnly: true});

            res.redirect("/api/sessions/current");
        }catch(error){
            res.status(500).send("error token auth");
        }
    }

    async current (req, res){
        if(req.user){
            const userDTO =  await userService.generateDTO(req.user);
            res.render("home", {user: userDTO});
        }else{
            res.send("no auth");
        }
    }

    async logout(req, res){
        res.clearCookie("metroToken");
        res.redirect("/login");
    }
}

export default UserController;