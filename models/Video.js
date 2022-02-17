const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = mongoose.Schema({
    instructor: {
        type: String
    },
    courseNumber: {
        type: Number
    },

    sectionNumber: {
        type: Number
    },

    title:{
        type: String
    },

    vimeoUrl: {
        type: String
    },

    category: {
        type: String
    }
})

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;