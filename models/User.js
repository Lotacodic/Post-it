const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email:{
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    password:{
        type: String,
        require: true,
        min: 6,
    },
    avatar:{
        type:String,
      },
    followers:{
        type: Array,
        default:[]
    },
    followings:{
        type: Array,
        default:[]
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max:50
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    }
},
    {timestamps: true }
)

module.exports = mongoose.model("user", UserSchema);