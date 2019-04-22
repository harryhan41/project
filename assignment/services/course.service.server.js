var courseModel = require("../model/course/course.model.server");

module.exports = function (app) {
  app.post("/api/user/:userId/course", createWebsite);
  app.get("/api/user/:userId/course", findAllWebsitesForUser);
  app.get("/api/course/:websiteId", findWebsiteById);
  app.put("/api/course/:websiteId", updateWebsite);
  app.delete("/api/course/:websiteId", deleteWebsite);
  app.get("/api/user/:userId/:name/course", findCourseByName);

  function createWebsite(req, res) {

    let userId = req.params.userId;
    let website = req.body;
    courseModel
      .createWebsite(userId, website)
      .then(
        function (website) {
          console.log("course created!");
          res.json(website);
        },
        function (error) {
          if (error) {
            console.log(error);
            res.statusCode(400).send(error);
          }
        },
      );
  }

  function findAllWebsitesForUser(req, res) {
    console.log("find courses for user");

    let dev_id = req.params.userId;
    courseModel.findAllWebsitesForUser(dev_id).exec(
      function (err, websites) {
        if (err) {
          return res.status(400).send(err);
        }
        return res.json(websites);
      },
    );
  }

  function findWebsiteById(req, res) {

    let web_id = req.params.websiteId;

    courseModel.findWebsiteById(web_id).exec(
      function (err, website) {
        if (err) {
          return res.status(400).send(err);
        }
        return res.json(website);
      },
    );
  }

  function updateWebsite(req, res) {
    console.log("update course");

    let web_id = req.params.websiteId;
    let website = req.body;
    courseModel.updateWebsite(web_id, website).exec(
      function (err, website) {
        if (err) {
          console.log(err);
          return res.status(400).send(err);
        }
        return res.json(website);
      },
    );
  }

  function deleteWebsite(req, res) {
    let web_id = req.params.websiteId;
    courseModel
      .deleteWebsite(web_id)
      .then(
        res.sendStatus(200)
      );
  }

  function findCourseByName(req, res) {
    let name = req.params.name;
    courseModel.findCourseByName(name).exec(
      function (err, courses) {
        if (err) {
          return res.status(400).send(err);
        }
        return res.json(courses);
      },
    );
  }
};
