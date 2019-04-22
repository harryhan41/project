var userModel = require("../user/user.model.server");
var mongoose = require("mongoose");
var courseSchema = require("./course.schema.server");

var courseModel = mongoose.model("Course", courseSchema);

courseModel.createWebsite = createWebsite;
courseModel.findAllWebsitesForUser = findAllWebsitesForUser;
courseModel.findWebsiteById = findWebsiteById;
courseModel.updateWebsite = updateWebsite;
courseModel.deleteWebsite = deleteWebsite;
courseModel.findCourseByName = findCourseByName;

module.exports = courseModel;

//helper function
function createWebsite(userId, website) {
  website.userId = userId;
  return courseModel.create(website).then(
    function (newWebsite) {
      userModel.findUserById(userId)
        .then(
          function (user) {
            user.courses.push(newWebsite);
            return user.save();
          },
        );
      return website;
    },
  );
}

function findAllWebsitesForUser(userId) {
  return courseModel.find({"studentId": userId});
}

function findWebsiteById(websiteId) {
  return courseModel.findOne({_id: websiteId});
}

function updateWebsite(websiteId, website) {
  return courseModel.findOneAndUpdate({_id: websiteId}, website);
}

function deleteWebsite(websiteId) {
  return courseModel.findOneAndDelete({_id: websiteId});
}

function findCourseByName(professor) {
  return courseModel.find({professor: professor});
}
