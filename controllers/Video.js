const express = require('express');
const {Video} = require('../models');
const { Comment } = require('../models');

const videoIndex = (req, res)=>{
    Video.find({}, (err, foundVideos) => {
        if (err) console.log('Error in video index: ', err)

        if (!foundVideos) return res.json({
            message: 'No Videos found in database.'
        })

        res.status(200).json({ videos: foundVideos});
        // console.log(foundVideos[foundVideos.length - 1]._id);
        console.log(foundVideos);
    });
}

// Show
const videoShow = async function (req, res) {
    try {
        const video = await Video.findById(req.params.id);
        const comments = await Comment.find({videoId: req.params.id}).populate("author");

        res.status(200).json({video, comments});

    } catch (error) {
        return console.log(error);
    }
}

// Delete
const videoDelete = (req, res) => {
    Video.findByIdAndDelete(req.params.id, (err, deletedVideo) => {
        if (err) {
            console.log('Error in Video#destroy:', err) 
            return res.send("Incomplete Video#destroy controller function");
        }
    
        res.status(200).json(
            {
                deletedVideo
            }
        );
    });
}

// Update
const videoUpdate = async (req, res) => {
    try {

        const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )

        res.status(200).json(updatedVideo);

    } catch (err) {
        return console.log(err);
    }
}

// Create
const videoCreate = (req, res)=>{
    Video.create(req.body, (err, savedVideo) => {
        if (err) console.log('Error in video create: ', err)

        res.status(201).json({ video: savedVideo });
    });
}

///////////////////////
// EXPORT
///////////////////////
module.exports = {
    videoIndex,
    videoShow,
    videoDelete,
    videoUpdate,
    videoCreate,
}