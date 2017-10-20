// controllers/usersContoller.js
var db = require('../models');
var passport = require("passport")


// Shows a list of all users logged into the site 
function show(req,res){
    db.User.find({}).exec(function(err, users){
        if(err){
            console.log(err);
            return; 
        }
        res.render(
            'users.ejs',
            {
                message: req.flash('errorMessage'),
                users: users
            })
    })
}

// Displays the page of a user when given the username 
function index(req,res){
    let username = req.params.username;
    db.User.findOne({username: username}, function (err, foundUser) {
        if (err) {
            console.log(err);
            return;
        }
        if(foundUser){  
            db.WorkspaceItem.find({_userId: foundUser._id})
                .populate('_userId')
                .populate('_softwareId')
                .exec(function(err, workspaceItems){
                    if(err){
                        res.status(500).send(err);
                        return;
                    }
                    res.render(
                        'userProfile.ejs', 
                        {
                            message: req.flash('errorMessage'), 
                            user: foundUser, 
                            workspaceItems: workspaceItems
                        });
                });
        }else{
            res.send('user not found');
        }
    });
}

// Displays form page for updating basic profile information 
function edit(req,res){
    let username = req.params.username;
    db.User.findOne({username: username}, function (err, foundUser) {
        if (err) {
            console.log(err);
            return;
        }
        res.render(
            'userProfileEdit.ejs', 
            {
                message: req.flash('errorMessage'), 
                user: foundUser
            });
    });

}

// Saves the updated information from the edit page. 
function update(req,res){
    let username = req.params.username;
    db.User.findOne({username: username}, function (err, foundUser) {
        if (err) {
            console.log(err);
            return;
        }
        foundUser.jobTitle = req.body.jobTitle;
        foundUser.jobField = req.body.jobField;
        foundUser.blurb = req.body.blurb;
        foundUser.save(function(err, saved) {
            console.log('Updated ', foundUser.username);
            res.redirect(`/users/${foundUser.username}`);
        });
    });
}

    
module.exports = {
    show: show,
    index: index,
    edit: edit,
    update: update
};