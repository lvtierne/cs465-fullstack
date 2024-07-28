<<<<<<< HEAD
/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways' });
   };
   module.exports = {
    travel
   };
=======
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways', trips});
};
   
module.exports = {
    travel
};
>>>>>>> 381cf44 (Module 3 completed baseline)
