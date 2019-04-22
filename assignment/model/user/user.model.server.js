var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("User", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUserName = findUserByUserName;
userModel.findByCredential = findByCredential;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.updateUserGrade = updateUserGrade;

module.exports = userModel;

//helper function

function createUser(user) {
  return userModel.create(user);
}

function findUserById(id) {
  return userModel.findById({_id: id});
}

function findUserByFacebookId(facebookId) {
  return userModel.findOne({"facebook.id": facebookId});
}

function findUserByUserName(userName) {
  return userModel.findOne({username: userName});
}

function findByCredential(userName, password) {
  return userModel.findOne({username: userName, password: password});
}

function updateUser(userId, user) {
  return userModel.findOneAndUpdate({_id: userId}, user);
}

function updateUserGrade(userId, course) {
  console.log('user model server ts is running');
  return userModel.findOneAndUpdate({_id: userId}, {
    $set: {
      "courses": course
    }
  });
}

function deleteUser(userId) {
  return userModel.findOneAndDelete({_id: userId});
}
