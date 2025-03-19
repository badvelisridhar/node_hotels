const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


// POST method for MenuItem
router.post('/', async (req, res) => {
    try{
        const MenuItem_data = req.body;          // Assume the request body constains the person data

        // Create a new Person document using the Mongoose model
        const newMenu = new MenuItem(MenuItem_data);
        const reponse = await newMenu.save();
        console.log('data(menu_item) saved... ');
        res.status(200).json(reponse);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// GET method to get the MenuItem
router.get('/', async (req, res) => {
    try{
        const menu = await MenuItem.find();
        console.log('data(menu) fetched successfully...');
        res.status(200).json(menu);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// GET to get specific work type persons
router.get('/:tasteType', async (req, res) => {
    try{
        const tasteType = req.params.tasteType;   //Extract the work type from the URL parameter
        if(tasteType == 'spicy' || tasteType == 'sour' || tasteType == 'sweet'){
            const reponse = await MenuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(reponse);
        }
        else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
// Comment added for testing purpose
module.exports = router;