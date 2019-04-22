module.exports = function(app) {
  require("./services/user.service.server.js")(app);
  require("./services/course.service.server.js")(app);
};
