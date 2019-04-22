var mongoose = require("mongoose");
var courseSchema = require("../course/course.schema.server");

var userSchema = new mongoose.Schema({
  facebook: {id: String, token: String, displayName: String},
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  role: String,
  courses: [courseSchema],
  dateCreate: {type: Date, default: Date.now()},
}, {collection: "Users"});

module.exports = userSchema;
