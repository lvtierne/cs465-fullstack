// Get meals view
const meals = (req, res) => {
    res.render('meals', { title: 'Travlr Getaway' });
};

module.exports = { meals };