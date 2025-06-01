const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:12ka442ka1@cloudclus.hlbugrd.mongodb.net/shryne?retryWrites=true&w=majority&appName=Cloudclus');

const userSchema = mongoose.Schema({
    username:String,
    password:String
});

const User = mongoose.model("User",userSchema);

module.exports = User