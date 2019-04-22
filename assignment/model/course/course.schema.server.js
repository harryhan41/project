var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
  studentId: {type: mongoose.Schema.ObjectId, ref: "userModel"},
  professor: String,
  name: String,
  grade: String,
  dateCreate: {type: Date, default: Date.now()},
}, {collection: "Courses"});

module.exports = courseSchema;
