const express = require("express")
const jwt = require("jsonwebtoken");
const { User, Course, PurchasedCourse } = require("../db");
const { secretKeyUser, authJwtUser } = require("../middleware/auth");


const router = express.Router()

router.post('/signup',async(req,res) => {
    const {firstName, lastName, username, password, profilePic, role} = req.body;
    const user = await User.findOne({username})
    if(user){
        res.status(403).json({message: "User already exist. Please Log In"})
    }else{
        const newUser = new User({firstName, lastName, username, password, profilePic, role})
        await newUser.save()
        const token = jwt.sign({username, role: "user"}, secretKeyUser, {expiresIn: '1h'});
        res.status(200).json({message: "User signup successfully", token})
    }
})

router.post('/signin', async(req,res) => {
    const{username, password} = req.body
    const user = await User.findOne({username, password})
    if(user) {
      const token = jwt.sign({username, role: "user"}, secretKeyUser, {expiresIn: '1h'})
      res.status(200).json({message: "Logged in successfully", token})
    }else{
      res.status(403).json({messsage: "Invalid Username or Password"})
    }
})

router.post('/me', authJwtUser, async(req,res) => {
    const user = await User.findOne({username: req.user.username})
    if(user){
        res.status(403).json({message: "User not exist"})
        return
    }
    res.status(200).json({username: user.username, role: user.role})
})

router.get('/courses', authJwtUser, async(req, res) => {
    const courses = await Course.find({published: true})
    res.status(200).json({courses})
})

router.post('/courses/:courseId', authJwtUser, async(req,res) => {
    const user = await User.findOne({username: req.user.username})
    const userId = user._id
    const courseId = req.params.courseId
    const purchaseDate = Date.now()
    const purchase = new PurchasedCourse({
        courseId, userId, purchaseDate
    })
    await purchase.save()
    res.status(200).json({message: "Course purchased successfully", courseId: purchase.courseId})
})

router.get('/purchasedCourses', authJwtUser, async(req,res) => {
    const user = await User.findOne({username: req.user.username})
    const userId = user._id
    const courses = await PurchasedCourse.find({userId}).populate({
        path: 'courseId',
        model: 'Course',
        select: "title description price imageLink published"
    })
    res.status(200).json({courses})
})
router.get("/course/:courseId", authJwtUser, async(req,res) => {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId);
    res.status(200).json({course})
})
module.exports = router