var Hapi = require('hapi');
var handler = require('./lib/handler');


var server = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 3000);

server.views({
    path: './public',
    engines: {
        html: require('handlebars')
    }
});

server.route([
    {
        method: 'GET',
        path: '/',
        handler: function (req, res) {
            res.view('index.html');
        }
    },
    {
        method: 'POST',
        path: '/generate',
        config: handler.fileGen
    }
]);

server.start(console.log('server started'));
