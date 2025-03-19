const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());         // req.body
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Welcome to my hotel... What can I get for you sir?')
})



// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


app.listen(PORT, ()=>{                  // Along with callback() function
    console.log("listening on port 3000"); 
});


// app.get('/chicken', (req, res) => {
//     res.send('Surely I can bring you chicken sir..')
// })


// // POST method for MenuItem
// app.post('/menu', async (req, res) => {
//     try{
//         const MenuItem_data = req.body;          // Assume the request body constains the person data

//         // Create a new Person document using the Mongoose model
//         const newMenu = new MenuItem(MenuItem_data);
//         const reponse = await newMenu.save();
//         console.log('data(menu_item) saved... ');
//         res.status(200).json(reponse);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// // GET method to get the MenuItem
// app.get('/menu', async (req, res) => {
//     try{
//         const menu = await MenuItem.find();
//         console.log('data(menu) fetched successfully...');
//         res.status(200).json(menu);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })