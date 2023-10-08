const express = require('express')
const mongoose = require('mangoose')
const {Admin, Course} = require("../db")
const jwt = require('jsonwebtoken')
const { secretKeyAdmin } = require("../middleware/auth")
const { authJwtAdmin } = require("../middleware/auth")

const router = express.Router()

router.get('/me', authJwtAdmin, async(req, res) => {
    const admin = await Admin.findOne({username: req.user.username})
    //user.username because req is from authJwtAdmin
    if(!admin){
        res.status(403).json({message: "Admin not exist"})
    }else{
        res.status(200).json({username: admin.username})
    }
  })
  

router.post("/signup", async(req,res) => {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username})
    if(admin){
      res.status(403).json({message: "Admin already exist. Please Log In"})
    }else{
      const obj = {username: username, password: password}
      const newAdmin = new Admin({username, password})
      await newAdmin.save()
      const token = jwt.sign({username, role: "admin"}, secretKeyAdmin, {expiresIn: '1h'});
      res.status(200).json({message:"Admin created successfully"}, token)
    }
  })
  

router.post("/signin", async(req,res) => {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username, password})
    if(admin) {
      const token = jwt.sign({username, role: "admin"}, secretKeyAdmin, {expiresIn: '1h'})
      res.status(200).json({message: "Logged in successfully"})
    }else{
      res.status(403).json({messsage: "Invalid Username or Password"})
    }
  })
  

router.post("/courses", authJwtAdmin, async(req,res) => {
    const course = new Course(req.body);
    await course.save()
    res.status(200).json({message: "Course created successfully", courseId: course.id})
  })
  

router.put("/courses/:courseId", authJwtAdmin, async(req,res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new:true});
    if(course){
      res.status(200).json({message: "Course updated successfully"})
    }else{
      res.status(404).json({message: "Course not found"})
    }
  })
  

router.get("/courses", authJwtAdmin, async(req,res) => {
    const courses = await Course({});
    res.status(200).json({courses})
  })
  
router.get("/courses/:courseId", authJwtAdmin, async(req,res) => {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId);
    res.status(200).json({course})
})
module.exports = router