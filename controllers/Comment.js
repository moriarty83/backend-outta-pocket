const { text } = require('express');
const express = require('express');
const { Comment } = require('../models')

// Index
const commentIndex = (req, res)=>{

}

// Show
const commentShow = (req, res)=>{

}

// Delete
const commentDelete = async (req, res)=>{
    try {
        const foundComment = await Comment.findById(req.params.id)
        if(foundComment.author != req.currentUser){
            return res.status(400).json({
                status: 400,
                message: "Unauthorized",
            });
        }
        else{
            res.json(await Comment.findByIdAndRemove(req.params.id))
        }
    }
    catch (error) {
        res.status(400).json({error})
    }
}


// Update
const commentUpdate = async (req, res)=>{
    try {
        const foundComment = await Comment.findById(req.params.id)
        if(foundComment.author != req.currentUser){
            return res.status(400).json({
                status: 400,
                message: "Unauthorized",
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )

        res.status(200).json({updatedComment, status:200});

    } catch (err) {
        return console.log(err);
    }
}

// Create
const commentCreate = async (req, res)=>{
    try {
        req.body = {
            author: req.currentUser,
            videoId: req.body.videoId,
            text: req.body.text,
            responseTo: req.body.responseTo
        }

        const createdComment = await Comment.create(req.body);
    
        res.status(201).json({createdComment, status:201});

    } catch (err) {
        return console.log(err);
    }
}

///////////////////////
// EXPORT
///////////////////////
module.exports = {
    commentIndex,
    commentShow,
    commentDelete,
    commentUpdate,
    commentCreate,
}