const express = require('express');
const { Reaction } = require('../models')

///////////////////////
// ROUTER
///////////////////////
const router = express.Router();

///////////////////////
// ROUTES
///////////////////////

// Index
router.get('/', (req, res)=>{

})

// New
router.get('/new', (req, res)=>{

});

// Delete
router.delete('/:id', (req, res)=>{

});

// Update
router.put('/:id', (req, res)=>{
  
});

// Create
const reactionCreate = async (req, res)=>{
  try {

    req.body = {
      userId: req.currentUser,
      videoId: req.body.videoId
    }
    const foundReaction = await Reaction.find({
      videoId: req.body.videoId, 
      userId: req.body.userId
    });

    if (foundReaction.length > 0) {
      req.body.like = !foundReaction[0].like
      console.log(foundReaction[0]);
      console.log(req.body.like);
        // req.body.like === false;
        const updatedReaction = await Reaction.findByIdAndUpdate(foundReaction[0]._id, req.body, {new: true});
        res.status(201).json(updatedReaction);
      
      // else {
      //   req.body.like === true;
      //   const createdReaction = await Reaction.create(req.body);
      //   res.status(201).json(createdReaction);
      // }
    } else {
      req.body.like = true;
      const createdReaction = await Reaction.create(req.body);
      res.status(201).json(createdReaction);
    }
  } catch (err) {
      return console.log(err);
  }
}

// Edit
router.get('/:id/edit', (req, res)=>{

});

// Show
router.get('/:id', (req, res)=>{

});


///////////////////////
// EXPORT
///////////////////////
module.exports = {
  reactionCreate,
}