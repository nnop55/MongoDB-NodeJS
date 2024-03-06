const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{type:String, required:true},
        email:{type:String, required:true},
        products:[{type:mongoose.Schema.Types.ObjectId, ref:"Products"}]
    },
    {
        versionKey:false
    }
);

module.exports = mongoose.model("Users", userSchema)
