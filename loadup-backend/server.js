'use strict';

const expressApp = require('./app');
const http = require('http');

expressApp()
    .then(app => {
        const server = http.createServer(app);
        const listener = server.listen(3000, (err) => {
            if (err) {
                console.error('Server error', err);
            } else {
                console.log(`server running at  ${listener.address().port}`);
            }
        });
    });
