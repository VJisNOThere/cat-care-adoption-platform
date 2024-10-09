//App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import Navbar from './components/Navbar'; // Import Navbar component
import Footer from './components/Footer'; // Import Footer component
import Home from './pages/Home'; // Import Home page component
import CatProfile from './pages/CatProfile'; // Import CatProfile page component
import Dashboard from './pages/Dashboard'; // Import Dashboard page component
import WellnessContent from './pages/WellnessContent'; // Import WellnessContent page component
import Login from '../pages/Login'; // Import Login page component
import Register from '../pages/Register'; // Import Register page component
import Payment from '../pages/Payment'; // Import Payment page component
import { CatProvider } from '../contexts/CatContext'; // Import CatProvider from context
import { AuthProvider } from '../contexts/AuthContext'; // Import AuthProvider from context
import './styles/App.css'; // Import App-specific CSS styles

// Main App component
function App() {
  return (
    <AuthProvider> {/* Provide authentication context to the application */}
      <CatProvider> {/* Provide cat context to the application */}
        <Router> {/* Set up React Router */}
          <div className="App">
            <Navbar /> {/* Render the Navbar component */}
            <div className="content">
              <Routes> {/* Define the application routes */}
                <Route path="/" element={<Home />} /> {/* Home route */}
                <Route path="/login" element={<Login />} /> {/* Login route */}
                <Route path="/register" element={<Register />} /> {/* Register route */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute> {/* Protect Dashboard route with PrivateRoute */}
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/cat/:id" element={<CatProfile />} /> {/* Cat profile route with dynamic ID */}
                <Route path="/wellness-content" element={<WellnessContent />} /> {/* Wellness content route */}
                <Route
                  path="/payment"
                  element={
                    <PrivateRoute> {/* Protect Payment route with PrivateRoute */}
                      <Payment />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
            <Footer /> {/* Render the Footer component */}
          </div>
        </Router>
      </CatProvider>
    </AuthProvider>
  );
}

export default App; // Export the App component for use in other parts of the application
