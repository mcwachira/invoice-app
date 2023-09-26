import { ADMIN , USER } from "../constants/index.js";

const ROLES ={

    User:USER, 
    Admin:ADMIN,
}

const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req?.user && !req?.roles){
            restart.status(401);


            throw new Error('you are not authorized on our platform')
        }


        const rolesArray = [...allowedRoles];


        const roleFound = req.roles.map((role) => rolesArray.includes(role)).find((value) => value === true) ;

        if(!roleFound){
            res.status(401)

            throw new Error('you are not authorized to perform  this request')

        }

        next()
}

}

const role = {ROLES, checkRole}

export default role