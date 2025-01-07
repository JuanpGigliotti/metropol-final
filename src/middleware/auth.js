export function soloAdmin(req, res, next){
    if(req.user.role === "admin"){
        next()
    }else{
        res.status(403).send("access denied, this place is only admins");
    }
}

export function soloUser(req, res, next){
    if(req.user.role ==="user"){
        next()
    }else{
        res.status(403).send("access denied this place is only users common");
    }
}