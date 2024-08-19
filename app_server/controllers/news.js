// Get news view
const news = (req, res) => {
    res.render('news', { title: 'Travlr Getaway' });
};

module.exports = { news };