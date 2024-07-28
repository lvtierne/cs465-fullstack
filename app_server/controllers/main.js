<<<<<<< HEAD
/* Get Homepage */
const index = (req, res) => {
    res.render('index', {title : 'Travlr Getaways'})
=======
/* GET homepage */
const index = (req, res) => {
    res.render('index', {title: 'Travlr Getaways' });
>>>>>>> 381cf44 (Module 3 completed baseline)
};
module.exports = {
    index
};