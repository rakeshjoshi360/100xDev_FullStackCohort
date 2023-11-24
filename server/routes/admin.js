const express = require('express')
const {Admin, Course, PurchasedCourse} = require("../db")
const jwt = require('jsonwebtoken')
const { secretKeyAdmin } = require("../middleware/auth")
const { authJwtAdmin } = require("../middleware/auth")

const router = express.Router()

router.get('/me', authJwtAdmin, async(req, res) => {
    const admin = await Admin.findOne({username: req.user.username})
    //user.username because req is from authJwtAdmin
    if(!admin){
        res.status(403).json({message: "Admin not exist"})
        return
    }
    res.status(200).json({username: admin.username, role: admin.role})
  })
  

router.post("/signup", async(req,res) => {
    const {firstName, lastName, username, password, profilePic, role} = req.body;
    const admin = await Admin.findOne({username})
    if(admin){
      res.status(403).json({message: "Admin already exist. Please Log In"})
    }else{
      const newAdmin = new Admin({firstName, lastName, username, password, profilePic, role})
      await newAdmin.save()
      const token = jwt.sign({username, role: "admin"}, secretKeyAdmin, {expiresIn: '1h'});
      res.status(200).json({message:"Admin created successfully", token})
    }
  })


router.post("/signin", async(req,res) => {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username, password})
    if(admin) {
      const token = jwt.sign({username, role: "admin"}, secretKeyAdmin, {expiresIn: '1h'})
      res.status(200).json({message: "Logged in successfully", token})
    }else{
      res.status(403).json({messsage: "Invalid Username or Password"})
    }
  })
  

router.post("/courses", authJwtAdmin, async(req,res) => {
    const { title, description, price, imageLink, published } = req.body
    const admin = await Admin.findOne({username: req.user.username})
    const adminId = admin._id
    const course = new Course({
      title, description, price, imageLink, published, admin: adminId
    });
    await course.save()
    res.status(200).json({message: "Course created successfully", courseId: course._id})
  })
  

router.put("/course/:courseId", authJwtAdmin, async(req,res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new:true});
    if(course){
      res.status(200).json({message: "Course updated successfully"})
    }else{
      res.status(404).json({message: "Course not found"})
    }
  })
  

router.get("/courses", authJwtAdmin, async(req,res) => {
    const admin = await Admin.findOne({username: req.user.username})
    const adminId = admin._id
    const courses = await Course.find({ admin: adminId });
    res.status(200).json({courses})
  })
  
router.get("/course/:courseId", authJwtAdmin, async(req,res) => {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId);
    res.status(200).json({course})
})

router.delete("/course/:courseId", authJwtAdmin, async(req,res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId)
  if(!course){
    return res.status(404).json({ message: 'Course not found' });
  }
  const admin = await Admin.findOne({username: req.user.username})
  if (!admin || !course.admin.equals(admin._id)) {
    return res.status(403).json({ message: 'Permission denied' });
  }
  await Course.findByIdAndDelete(courseId);
  await PurchasedCourse.deleteMany({ courseId });
  res.status(200).json({ message: 'Course deleted successfully' });
})
module.exports = router