const jwt = require('jsonwebtoken');

//
// MIDDLEWARES
//

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decode.usuario;
        console.log(token);
        next();
    })

}


let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        return next();
    }

    return res.json({
        ok: false,
        err: {
            message: 'El usuario no es administrador'
        }
    });

}



module.exports = {
    verificaToken,
    verificaAdminRole
}