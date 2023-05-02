const http = require('http');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const helmet = require('helmet');

const express = require('express');
const app = express();

app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(helmet());
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/about', function(req, res) {
    res.send('About');
});

app.get('/contact-me', function(req, res) {
    res.send('Contact Me');
});

app.get('*', function(req, res) {
    res.send('404');
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
})

// http.createServer(function (req, res) {
//     // if (req.url === '/') {
//     //     fs.readFile('index.html', function(err, data) {
//     //         if (err) throw err;
//     //         res.writeHead(200, {'Content-Type': 'text/html'});
//     //         res.write(data);
//     //         return res.end;
//     //     });
//     // } else
//     if (req.url === '/about') {
//         fs.readFile('about.html', function(err, data) {
//             if (err) throw err;
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(data);
//             return res.end;
//         });
//     } else if (req.url === '/contact-me') {
//         fs.readFile('contact-me.html', function(err, data) {
//             if (err) throw err;
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(data);
//             return res.end;
//         });
//     } else {
//         fs.readFile('404.html', function(err, data) {
//             if (err) throw err;
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(data);
//             return res.end;
//         })
//     }
// }).listen(8080, function() {
//     console.log('Listening on port 8080...');
// });
