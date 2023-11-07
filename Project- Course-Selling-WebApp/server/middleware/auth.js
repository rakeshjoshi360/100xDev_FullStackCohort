const jwt = require('jsonwebtoken')

const secretKeyAdmin = "AdMiNsecreatK3y12E"

const authJwtAdmin = (req, res, next) => {
  const headerAuth = req.headers.authorization
  if(headerAuth){
    const token = headerAuth.split(' ')[1];
    jwt.verify(token, secretKeyAdmin, (err, user) => {
      if(err){
        return res.sendStatus(403)
      }
      req.user = user
      next();
    })
  }else{
    res.sendStatus(403)
  }
}

module.exports = {
    authJwtAdmin,
    secretKeyAdmin
}