const { connect, connection } = require('mongoose');

connect('mongodb://localhost/solialnetworkapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;