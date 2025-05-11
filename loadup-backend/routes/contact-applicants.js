'use strict';

/**
 * This function is used to hit the API for the given user query
 * @returns {function(Request, Response, function(?Error))}
 */
module.exports = () => {
    return async (req, res, next) => {
        try {

            const { applicantIds } = req.body;
            if (!Array.isArray(applicantIds)) {
                throw new Error('Invalid applicantIds');
            }

            console.log(`Contact applicants with IDs: ${applicantIds}`);

        } catch (error) {
            console.error('Error in contact applicants API', error);
        }
    };
};

