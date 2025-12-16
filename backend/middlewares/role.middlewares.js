const authRoles=(...roles)=>(req,res,next)=>{
    console.log('User Role:', req.user ? req.user.role : 'No user info');
    if(!req.user){
        return res.status(401).json({msg:'Unauthorized: No user information found'});
    }
    if(!roles.includes(req.user.role)){
        return res.status(403).json({msg:'Access Denied: You do not have permission to access this resource'});
    }
    next();
}
module.exports=authRoles;