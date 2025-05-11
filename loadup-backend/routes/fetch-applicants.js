'use strict';

const { getApplicantsURL } = require('../constant').api;
const { setApplicants, getApplicants } = require('../helper/applicant-cache');
const axios = require('axios');


module.exports = () => {
  return async (req, res, next) => {
    try {
      const filters = cleanFilters(req.query); // removing empty filters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      let results = getApplicants();

      // Fetch and cache if not already done
      if (!results.length) {
        console.log("Fetching from external API...");
        const response = await axios.get(getApplicantsURL);
        results = response.data;
        setApplicants(results);
      }

      // Applying filters
      if (Object.keys(filters).length) {
        results = results.filter(applicant => {
        for (const [key, value] of Object.entries(filters)) {
            const filterVal = value.toLowerCase();

            switch (key.toLowerCase()) {
              case 'location':
                return applicant.PostalCode?.toLowerCase().includes(filterVal);
              case 'license':
              case 'qualification':
                return extractLicense(applicant).toLowerCase().includes(filterVal);
              case 'name':
                return applicant.Name?.toLowerCase().includes(filterVal);
              case 'email':
                return applicant.Email?.toLowerCase().includes(filterVal);
              default:
                return true;
            }
          }});
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedResults = results.slice(startIndex, endIndex);
      const dataObj = {
        message: 'Filtered and paginated applicants',
        pagination: {
          total: results.length,
          page,
          limit,
          totalPages: Math.ceil(results.length / limit),
        }
      }

      return res.status(200).send({ data: paginatedResults, dataObj: dataObj, message: 'list of applicants' });
    } catch (error) {
      console.error('Error in applicant filter API:', error);
    }
  };
};

/**
 * Extracting license field from applicant.
 */
const extractLicense = (applicant) => {
  const licenseField = applicant.FormInfo?.find(f =>
    f.question?.toLowerCase().includes('führerschein')
  );
  return licenseField?.answers || '';
};

/**
 * removing query params
 */
const cleanFilters = (filters = {}) => {
  const cleanFilters = {};
  for (const [key, value] of Object.entries(filters)) {
    if (value && value.trim() !== '') {
      cleanFilters[key] = value.trim();
    }
  }
  return cleanFilters;
};
