var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load forum page and pass all current posts
  app.get("/forum", function(req, res) {
    db.Forum.findAll({
      include: [db.User]
    }).then(function(post) {
      let postArray = post.reverse();
      res.render("forum", {
        posts: postArray
      });
    });
  });

  app.get("/news", function(req,res) {
    res.render("news")
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
