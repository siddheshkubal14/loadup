'use strict';

const { mockResults } = require('../constant');
let applicantsCache = [];

//temp data used to mock licenses.
// let tempData = mockResults;


const setApplicants = (data) => {
    applicantsCache = data;
};

const getApplicants = () => applicantsCache;

module.exports = { setApplicants, getApplicants };