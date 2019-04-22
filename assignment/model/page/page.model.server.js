var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var courseModel = require("../course/course.model.server");
var pageModel = mongoose.model("Page", pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page) {
  page.websiteId = websiteId;
  return pageModel.create(page).then(
    function (page) {
      courseModel.findWebsiteById(websiteId)
        .then(
          function (website) {
            website.courses.push(page);
            courseModel.updateWebsite(websiteId, website);
          },
        );
      return page;
    },
  );
}

function findAllPagesForWebsite(websiteId) {
  return pageModel.find({websiteId: websiteId});
}

function findPageById(id) {
  return pageModel.findOne({_id: id});
}

function updatePage(pageId, page) {
  return pageModel.findOneAndUpdate({_id: pageId}, page);
}

function deletePage(pageId) {
  return pageModel.findOneAndDelete({_id: pageId});
}
