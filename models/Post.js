const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postit: {
        type: String,
        max: 500
    },
    img: {
        type: String,
    },
    file: {
        type: Array,
        default: []
    },
    likes:{
        type: Array,
        default: []
    },
},
{timestamps: true }
)

modules.exports = mongoose.model("Post", PostSchema);