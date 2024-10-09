# Cat Care & Adoption Platform - Frontend

This is the frontend of the **Cat Care & Adoption Platform**, a web application built with React that allows users to browse cats for adoption, manage their profiles, view wellness content, and process payments.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Environment Setup](#environment-setup)
3. [Installation](#installation)
4. [Running the App](#running-the-app)
5. [Build for Production](#build-for-production)
6. [Environment Variables](#environment-variables)
7. [API Endpoints](#api-endpoints)
8. [Common Issues & Troubleshooting](#common-issues--troubleshooting)
9. [Contributing](#contributing)
10. [License](#license)

## Project Structure

```plaintext
├── public
│   ├── index.html           # Main HTML file
│   └── logo.png             # Project logo
├── src
│   ├── components           # React components
│   │   ├── Navbar.js        # Navbar component
│   │   ├── Footer.js        # Footer component
│   │   ├── CatCard.js       # Cat listing component
│   │   ├── CommentSection.js# Comment section component
│   │   ├── Rating.js        # Rating component
│   ├── pages
│   │   ├── Home.js          # Home page
│   │   ├── CatProfile.js    # Cat profile page
│   │   ├── Dashboard.js     # User dashboard
│   │   ├── WellnessContent.js # Wellness articles
│   │   ├── Login.js         # Login page
│   │   ├── Register.js      # Registration page
│   │   ├── Payment.js       # Payment page
│   ├── services
│   │   ├── api.js           # API service for network requests
│   │   ├── authService.js   # Auth-related API calls
│   │   ├── catService.js    # Cat-related API calls
│   │   ├── contentService.js# Content-related API calls
│   │   ├── paymentService.js# Payment-related API calls
│   ├── context
│   │   ├── AuthContext.js   # User authentication context
│   │   ├── CatContext.js    # Cat-related data context
│   ├── App.js               # Main React component
│   ├── index.js             # Entry point for React
│   ├── App.css              # Global styles
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation (this file)
```

## Environment Setup

Before running the project, ensure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) for package management

## Installation

Clone the repository and navigate to the frontend folder:

```bash
git clone https://github.com/yourusername/cat-care-adoption-frontend.git
cd cat-care-adoption-frontend
```

Then install the dependencies:

```bash
npm install
```

## Running the App

To run the app in development mode with hot reloading, use:

```bash
npm start
```

This will launch the app on `http://localhost:3000`. The page will reload when you make changes to the code.

## Build for Production

To build the project for production (optimized for performance):

```bash
npm run build
```

This will create a `build` directory containing the optimized production-ready files.

## Environment Variables

The project uses environment variables for managing sensitive data. Create a `.env` file in the root directory of the project and configure the following variables:

```plaintext
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_STRIPE_KEY=your-stripe-public-key
```

Make sure the backend API URL and Stripe key are correctly set.

## API Endpoints

This frontend interacts with the backend through RESTful API calls. Below are the key endpoints used:

- **User Authentication**: `/auth/register`, `/auth/login`, `/auth/me`
- **Cats Management**: `/cats`, `/cats/:id`
- **Wellness Content**: `/content`
- **Payment Processing**: `/payment/checkout`

All requests are made through the services located in the `src/services` folder, which handles the interaction with the backend API.

## Common Issues & Troubleshooting

1. **CORS issues**: If you encounter CORS errors while making API requests, make sure the backend is configured to accept requests from the frontend's origin.

2. **Environment variable errors**: Ensure that the `.env` file is present and correctly configured.

3. **API not reachable**: Verify that the backend server is running and that the `REACT_APP_API_BASE_URL` in the `.env` file points to the correct backend URL.

4. **Build errors**: If the build process fails, try clearing the cache and rebuilding:
   ```bash
   npm run clean
   npm run build
   ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Submit a pull request to the `main` branch with a description of your work.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.