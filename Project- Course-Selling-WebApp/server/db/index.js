const mongoose = require('mangoose')

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
})
const courseSchema = new mongoose.Schema({
  title: String,
  description: {type: String},
  price: Number,
  imageLink: String,
  published: Boolean
})

const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course', courseSchema)

module.exports = {
    Admin,
    Course
}