// Get about view
const about = (req, res) => {
    res.render('about', { title: 'Travlr Getaway' });
};

module.exports = { about };