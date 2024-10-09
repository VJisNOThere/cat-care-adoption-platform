# Cat Care & Adoption Platform

This is a **Cat Care & Adoption Platform**, a web-based application designed to streamline the adoption process for cats. Users can view cats available for adoption, access wellness content, and complete payments for services such as donations or adoption fees. The project consists of a **frontend** built with React and a **backend** built with Node.js, Express, and MongoDB.

## Features

- Browse cats available for adoption
- User registration and login
- Wellness content related to cat care
- Payment processing using Stripe
- Admin dashboard for managing cats and users

## Project Structure

### Backend Structure:

```plaintext
backend/
├── controllers/          # Logic for handling API requests
│   ├── authController.js
│   ├── catController.js
│   ├── contentController.js
│   ├── paymentController.js
├── middlewares/          # Custom middleware functions
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
├── models/               # Mongoose schemas for MongoDB
│   ├── User.js
│   ├── Cat.js
│   ├── WellnessContent.js
│   ├── Payment.js
├── routes/               # API routes
│   ├── authRoutes.js
│   ├── catRoutes.js
│   ├── contentRoutes.js
│   ├── paymentRoutes.js
├── utils/                # Utility functions
│   ├── generateToken.js
│   ├── errorHandler.js
│   ├── stripe.js
├── .env                  # Environment variables
├── db.js                 # MongoDB connection
├── app.js                # Main Express app
├── package.json          # Backend dependencies and scripts
└── README.md             # Backend documentation
```

### Frontend Structure:

```plaintext
frontend/
├── public/
│   ├── index.html        # Main HTML file
│   ├── logo.png          # Project logo
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── CatCard.js
│   │   ├── CommentSection.js
│   │   ├── Rating.js
│   ├── pages/            # Page components for different routes
│   │   ├── Home.js
│   │   ├── CatProfile.js
│   │   ├── Dashboard.js
│   │   ├── WellnessContent.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Payment.js
│   ├── services/         # API calls to backend
│   │   ├── authService.js
│   │   ├── catService.js
│   │   ├── contentService.js
│   │   ├── paymentService.js
│   ├── context/          # React context for managing global state
│   │   ├── AuthContext.js
│   │   ├── CatContext.js
│   ├── App.js            # Main React app component
│   ├── index.js          # React entry point
│   ├── App.css           # Styles
├── .env                  # Environment variables for frontend
├── package.json          # Frontend dependencies and scripts
└── README.md             # Frontend documentation
```

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (package manager)
- [MongoDB](https://www.mongodb.com/)

### Backend Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cat-care-adoption.git
   cd cat-care-adoption/backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file. Here's an example:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/catcare
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the backend server:

   ```bash
   npm start
   ```

   The backend API should now be running on `http://localhost:3001`.

### Frontend Installation

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Set up your frontend `.env` file with the backend URL and Stripe key:

   ```plaintext
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   REACT_APP_STRIPE_KEY=your_stripe_public_key
   ```

4. Start the frontend server:

   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3000`.

## Usage

### Local Development

- **Backend**: `http://localhost:5000/api`
- **Frontend**: `http://localhost:3000`

For testing or further development, you can modify the components or backend routes and test changes immediately with hot-reloading enabled.

### Production Build

To build the frontend for production, use:

```bash
npm run build
```

This creates an optimized build in the `build` folder, ready for deployment.

## Environment Variables

### Backend Variables:

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for generating JWTs
- `STRIPE_SECRET_KEY`: Stripe secret key for payment processing

### Frontend Variables:

- `REACT_APP_API_BASE_URL`: Base URL for API requests
- `REACT_APP_STRIPE_KEY`: Stripe public key for frontend payment processing

## API Endpoints

- **Authentication**: `/auth/register`, `/auth/login`, `/auth/me`
- **Cats**: `/cats`, `/cats/:id`
- **Wellness Content**: `/content`
- **Payments**: `/payment/checkout`

All endpoints are protected by authentication middleware where required.

## Common Issues & Troubleshooting

1. **CORS Errors**: Ensure that the backend is allowing requests from the frontend by setting appropriate CORS headers.
   
2. **Environment Variables**: Verify that your `.env` files are correctly configured for both backend and frontend.

3. **MongoDB Connection**: Make sure your MongoDB server is running and that `MONGO_URI` is correctly set.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Submit a pull request with a detailed description of the changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.