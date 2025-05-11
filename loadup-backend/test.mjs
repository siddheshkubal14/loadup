import { expect } from 'chai';
import { describe, it } from 'mocha';
import nock from 'nock';
import axios from 'axios';
import constants from './constant.js';  
const baseURL = 'http://localhost:3000';
import { getApplicants, setApplicants } from './helper/applicant-cache.js'; 


describe('Applicant Filtering API', function () {

  
  beforeEach(() => {
    setApplicants([]); 
  });

  it('should fetch and filter applicants', async function () {
    
    
    nock(baseURL) 
      .get('/fetch-applicants?location=50667') 
      .reply(200, constants.mockResult1);

    
    const response = await axios.get('http://localhost:3000/fetch-applicants?location=50667');
    // Log the response to verify the structure
    // console.log(response.data);

    // Assertions
    expect(response.status).to.equal(200);
    expect(response.data.data).to.have.lengthOf(1);
    expect(response.data.data[0].Name).to.equal('Clara Neumann');
  });

  it('should return an empty list if no matching applicants', async function () {
    
    nock(baseURL)
      .get('/fetch-applicants?location=12345')
      .reply(200, constants.mockResult2);

   // http://localhost:3000/fetch-applicants
    const response = await axios.get('http://localhost:3000/fetch-applicants?location=12345');

    expect(response.status).to.equal(200);
    expect(response.data.data).to.have.lengthOf(0); // Expect 0 results
  });

  //Commented following as there is no license data currently.

  // it('should return applicants with matching license filter', async function () {
    
  //   nock(baseURL)
  //     .get('/fetch-applicants?license=ce')
  //     .reply(200, mockApiResponse);

  //   const response = await axios.get('http://localhost:3000/fetch-applicants?license=ce');

  //   expect(response.status).to.equal(200);
  //   expect(response.data.data).to.have.lengthOf(5);
  // });

  it('should return paginated results', async function () {
    nock(baseURL).get('/fetch-applicants?page=1&limit=2').reply(200, constants.mockResult3);

    const response = await axios.get('http://localhost:3000/fetch-applicants?page=1&limit=2');
    expect(response.status).to.equal(200);
    expect(response.data.data).to.have.lengthOf(2);
  });
});
