const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: '/home/ubuntu/.env' });

const secretKeyAdmin = process.env.ADMIN_KEY
const secretKeyUser = process.env.USER_KEY



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

const authJwtUser = (req,res,next) => {
  const headerAuth = req.headers.authorization
  if(headerAuth){
    const token = headerAuth.split(' ')[1];
    jwt.verify(token, secretKeyUser, (err, user) => {
      if(err){
        return res.sendStatus(403)
      }
      req.user = user
      next()
    })
  }else{
    res.sendStatus(403)
  }
}

module.exports = {
    authJwtAdmin,
    authJwtUser,
    secretKeyAdmin,
    secretKeyUser
}
