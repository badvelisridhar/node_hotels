const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

// POST method for person
router.post('/', async (req, res) => {
    try{
        const data = req.body;          // Assume the request body constains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);
        const reponse = await newPerson.save();
        console.log('data(person details) saved...');
        res.status(200).json(reponse);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// GET method to get the person
router.get('/', async (req, res) => {
    try{
        const persons_data = await Person.find();
        console.log('data(all persons data) fetched successfully...');
        res.status(200).json(persons_data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// GET to get specific work type persons
router.get('/:workType', async (req, res) => {
    try{
        const workType = req.params.workType;   //Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const reponse = await Person.find({work: workType});
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

router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id;     //Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,              // Return the updated document
            runValidators: true     // Run mongoose validators
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;         // Extract person id from the URL parameter
        
        // Assuming you have person model
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'person Deleted successfully..'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;