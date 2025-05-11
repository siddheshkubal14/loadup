'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const helmet = require('helmet');

module.exports = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use(helmet());

    const router = express.Router();

    router.get('/healthcheck', (req, res) => {
        res.status(200).json({ message: 'ok' });
    });

    router.use('/', routes());
    app.use('/', router);
    return app;
};

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception', error);
});
