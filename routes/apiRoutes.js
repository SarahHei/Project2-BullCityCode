var db = require("../models");

var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  //post request to pass in user login credentials to log on
  app.post("/api/users-login", function(req, res) {
    //first checks the email to make sure there's a user with that email address
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(result=>{
      if(!result){
        res.send('no user');
      }
      //then checks the password to make sure it matches what's in the db
      let hashedPassword = CryptoJS.SHA256(req.body.password).toString();
      if(hashedPassword !== result.password){
        res.send('incorrect password');
      }
      //if all's good - then returns the data for that user
      res.json(result);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    let newEmail = req.body.email;
    //checks if the email input is already in use - if so, send a 404
    db.User.findOne({
      where: {email: newEmail}
    }).then(result=>{
      if(!result){
        //encrypt the password before storing it in the db
        req.body.password = CryptoJS.SHA256(req.body.password).toString();
        db.User.create(req.body).then(data=> {
          res.json(data)
        }).catch(err=> {
          console.log(err);
          res.status(404).end()
        });
      }else(
        res.status(404).end()
      );
    })
  });

  //puts new post into the db
  app.post("/api/forum", function(req,res) {
    db.Forum.create(req.body).then(data => {
      res.json(data);
    }).catch(err=>{
      res.status(404).end()
    })
  });

  //pulls all the previous posts from the db to display on the page
  app.get("/api/forum", function(req,res) {
    db.Forum.findAll({
      include: [db.User],
    }).then(function(result) {
      res.json(result);
    });
  });

  // Delete an example by id => boilerplate code - need to modify to actually be able to delete posts
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
