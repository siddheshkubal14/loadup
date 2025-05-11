'use strict';

const router = require('express').Router({ mergeParams: true });

/**
 * Definitions of the routes
 * @returns {Router}
 */
module.exports = () => {
    router.get('/fetch-applicants', require('./fetch-applicants')());
    router.post('/applicants', require('./contact-applicants')());

    return router;
};
