# LoadUp Application

## Overview
This app helps in managing and filtering applicant data through a backend API and a simple frontend UI. It is designed for performance and ease of use, especially when working with large datasets.

At server startup, the backend loads and caches all applicant data in memory. This ensures fast response times for subsequent requests, as data is served directly from the cache instead of being reloaded or queried repeatedly.

The project uses Docker for containerization to maintain consistent environments, GitHub for version control, and a custom deployment script to streamline the deployment process.

This repository consists of two main parts: the **frontend** and **backend**. The frontend is a React-based web application that interacts with the backend, which is an Express.js API running on Node.js. Docker is used for containerization to ensure consistent environments across different systems.

## Table of Contents

* [Overview](#overview)
* [Known Issues](#known-issues)
* [Directory Structure](#frontend-directory-structure)
* [Frontend](#frontend)

  * [Installation](#frontend-installation)
  * [Running the Frontend](#running-the-frontend)
* [Backend](#backend)

  * [Installation](#backend-installation)
  * [Running the Backend](#running-the-backend)
* [Deployment](#deployment)

  * [Deploying with Docker](#deploying-with-docker)
  * [Running the Deploy Script](#running-the-deploy-script)
*[Handling Invalid Filters and Empty Datasets](#Handling-Invalid-Filters-and-Empty-Datasets)
*[Architecture and Design Choices](#Architecture-and-Design-Choices)



## Known Issues
1. Current data doesn't have any data for license, I tested with mock data for multi-filter, and it worked well.
3. Given API https://onboarding-api-318352928563.us-central1.run.app/dashboard/application/1/talent?is_talent=true returns 404, hence used https://onboarding-api-318352928563.us-central1.run.app/dashboard/application which only gives data size of 13.


## Directory Structure

Project Root
│
├── deploy.sh                    # Shell script for deployment 
├── docker-compose.yml           # Docker Compose configuration for full-stack app
├── README.md                    # Project documentation
│
├── loadup-backend               # Backend service (Node.js + Express)
│   ├── .gitignore               # Git ignored files
│   ├── app.js                   # Express app initialization
│   ├── constant.js              # App-level constants
│   ├── dockerfile               # Dockerfile for backend container
│   ├── package.json             # Project metadata and scripts
│   ├── server.js                # Entry point to start server
│   ├── test.mjs                 # Test script for backend logic
│   │
│   ├── helper                   # Helper functions and utilities
│   │   ├── applicant-cache.js       # In-memory cache logic
│   │  
│   │   
│   │
│   └── routes                   # API route handlers
│       ├── contact-applicants.js    # Endpoint to simulate contacting applicants
│       ├── fetch-applicants.js      # Endpoint to fetch and filter applicants
│       └── index.js                 # Router index
│
└── loadup-frontend              # Frontend app (React + Vite)
    ├── .env                     # Environment variables
    ├── .gitignore               # Git ignored files
    ├── dockerfile               # Dockerfile for frontend container
    ├── eslint.config.js         # Linting configuration
    ├── index.html               # Main HTML template
    ├── package.json             # Project metadata and scripts
    ├── README.md                # Frontend-specific notes
    ├── vite.config.js           # Vite configuration
    │
    ├── public                   # Static assets
    │   └── vite.svg             # Vite logo
    │
    └── src                      # Source code
        ├── App.css             # Global styles for App component
        ├── App.jsx             # Root React component
        ├── index.css           # Global styles
        ├── main.jsx            # App entry point
        │
        ├── assets              # Image and asset files
        │   └── react.svg       # React logo (optional)
        │
        ├── components          # React components
        │   ├── FilterForm.jsx          # UI form for filtering applicants
        │   └── ApplicantList           # List view of applicants
        │       ├── ApplicantList.css   # Styles for applicant list
        │       └── ApplicantList.jsx   # Applicant list component
        │
        └── services            # API communication
            └── api.js          # Axios instance and API utilities


## Frontend

The frontend is built with **React.js** and provides a user interface for managing applicants.

### Frontend Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/siddheshkubal14/loadup.git
   cd loadup-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   * Create a `.env` file and add any necessary configuration (e.g., API URL).

### Running the Frontend

To start the frontend development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

## Backend

The backend is a REST API built with **Node.js** and **Express.js**. It manages applicant data and provides endpoints to interact with the frontend.


### Backend Installation

1. Navigate to the `loadup-backend` directory:

   ```bash
   cd loadup-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   * Create a `.env` file and configure environment variables like the database connection string.

### Running the Backend

To start the backend server:

```bash
npm start
```

The backend API will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

To deploy the application with Docker, you need to have Docker installed on your machine.

### Deploying with Docker

To deploy the frontend and backend using Docker, follow these steps:

1. **Build Docker images for frontend and backend:**

   * For the frontend:

     ```bash
     cd loadup-frontend
     docker build -t loadup-frontend .
     ```

   * For the backend:

     ```bash
     cd loadup-backend
     docker build -t loadup-backend .
     ```

2. **Run containers:**

   * For the frontend:

     ```bash
     docker run -p 5173:5173 loadup-frontend
     ```

   * For the backend:

     ```bash
     docker run -p 3000:3000 loadup-backend
     ```

3. **Verify deployment:**

   * The frontend will be available at [http://localhost:5173](http://localhost:5173).
   * The backend will be available at [http://localhost:3000](http://localhost:3000).

### Running the Deploy Script

You can also automate the deployment process by running the `deploy.sh` script.

1. Ensure that the script has executable permissions:

   ```bash
   chmod +x deploy.sh
   ```

2. Run the script:

   ```bash
   ./deploy.sh
   ```

This script handles the deployment by building and running the Docker containers for both the frontend and backend.


## Handling Invalid Filters and Empty Datasets
[Invalid-Filters]:
The API gracefully handles invalid or unsupported filters by ignoring them and returning unfiltered or partially filtered results, ensuring no internal server errors are thrown. Query validation is performed to allow only whitelisted parameters like location, license, page, and limit.

The application uses `URLSearchParams` to construct query strings, ensuring that special characters (like &, =, spaces) are automatically escaped and encoded safely.
This avoids issues with malformed URLs or rejected requests.

[Empty-Datasets]:
If no applicants match the given filters, the API responds with a 200 OK status and an empty data array. This allows front-end consumers to distinguish between no results and request failures without additional logic.

Pagination buttons (Previous / Next) are conditionally enabled or disabled based on the current page and result count.
The Contact button is also disabled if no applicant is selected, preventing empty or invalid submissions.


## Architecture and Design Choices
[Backend-Stack]:
Built with Node.js and Express.js, the backend exposes RESTful APIs designed for simplicity, maintainability, and performance.

[In-Memory-Caching]:
Applicant data is cached in memory using a helper module. This reduces redundant parsing or fetching during the test lifecycle and speeds up filter operations for mock data.

[Test-Strategy]:
API endpoints are tested using Mocha, Chai, and Nock to simulate network calls without requiring a live server. This ensures fast, deterministic, and isolated test runs.

[Modular-Codebase]:
Filtering logic, data sources, and caching mechanisms are abstracted into reusable modules, enabling easier future integrations (e.g., with a real database or third-party APIs).

[Pagination]:
Implemented via page and limit query params to support efficient rendering and navigation of large datasets.