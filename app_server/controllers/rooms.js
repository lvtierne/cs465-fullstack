// Get rooms view
const rooms = (req, res) => {
    res.render('rooms', { title: 'Travlr Getaway' });
};

module.exports = { rooms };