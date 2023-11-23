const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  profilePic: String,
  role: {
    type: String,
    default: 'admin',
  },
})

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  profilePic: String,
  role: {
    type: String,
    default: 'user',
  },
})

const courseSchema = new mongoose.Schema({
  title: String,
  description: {type: String},
  price: Number,
  imageLink: String,
  published: Boolean,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
})

const purchaseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  purchaseDate: { type: Date, default: Date.now },
})

const Admin = mongoose.model('Admin', adminSchema)
const User = mongoose.model('User', userSchema)
const Course = mongoose.model('Course', courseSchema)
const PurchasedCourse = mongoose.model('PurchasedCourse', purchaseSchema)

module.exports = {
    Admin,
    User,
    Course,
    PurchasedCourse
}