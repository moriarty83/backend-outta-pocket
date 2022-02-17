const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Reacting to comments
const reactionSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    like: {
        type: Boolean,
        default: false
    }
})

const Reaction = mongoose.model('Reaction', reactionSchema);
module.exports = Reaction;